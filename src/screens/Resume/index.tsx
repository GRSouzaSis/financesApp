import React, { useCallback, useState } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { HistoryCard } from "../../components/HistoryCard";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Container, 
  Header, 
  Title,
  ContainerList,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  SelectIcon,
  Month,
  LoadContainer,
} from "./styles";
import { categories } from "../../Utils/categories";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from 'styled-components'
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from '../../hooks/Auth';
interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string | Date;
}
interface CategoryData {
  name: string;
  totalFormatted: string;
  total: number;
  color: string;
  percent: string
}

export function Resume(){
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])
  const theme = useTheme()
  function handleChangeDate(action: 'next'| 'prev'){
    if(action === 'next'){
      setSelectedDate(addMonths(selectedDate, 1))
    }else{
      setSelectedDate(subMonths(selectedDate, 1))
    }
  }
  async function loadData() {
    setIsLoading(true)
    const dataKey = `@finances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expansive:TransactionData) => 
      (expansive.type === 'negative' || expansive.type === 'positive') && 
      new Date(expansive.date).getMonth() === selectedDate.getMonth() &&
      new Date(expansive.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensivesTotal = expensives
      .reduce((acumullator:number, expensive:TransactionData)=>{
        return acumullator + Number(expensive.amount);
    }, 0)
    const totalByCategory : CategoryData[] = []

    categories.forEach(category => {
      let categorySum = 0;
      expensives.forEach((expensive:TransactionData) => {
        if(expensive.category === category.key){
          categorySum += Number(expensive.amount);
        }
      });
      if(categorySum > 0 ){
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
        const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`
        totalByCategory.push({
          name: category.name,
          color: category.color,
          totalFormatted,
          total: categorySum,
          percent
        });
      }
    })
    setTotalByCategories(totalByCategory)
    setIsLoading(false)
  }  

  useFocusEffect(useCallback(()=>{   
    loadData()
  },[selectedDate]))

  return(
    <Container>
          <Header>
            <Title>Resumo por categoria</Title>
          </Header>
      {
        isLoading ?   
          <LoadContainer>
            <ActivityIndicator color={theme.colors.primary} size={'large'}/> 
          </LoadContainer>       
           :                
          <ContainerList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: useBottomTabBarHeight(),
            }}
          >
            <MonthSelect>
              <MonthSelectButton onPress={()=> handleChangeDate('prev')}>
                <SelectIcon name='chevron-left'/>
              </MonthSelectButton>
              <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>
              <MonthSelectButton onPress={()=> handleChangeDate('next')}>
                <SelectIcon name='chevron-right'/>
              </MonthSelectButton>
            </MonthSelect>

            <ChartContainer>
              <VictoryPie 
                data={totalByCategories}
                colorScale={totalByCategories.map(category => category.color)}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: 'bold',
                    fill: theme.colors.shape,
                  }
                }}
                labelRadius={100}
                x="percent"
                y="total"
              />
            </ChartContainer>
            {
              totalByCategories.map((item, index) => (
                <HistoryCard
                  key={index} 
                  title={item.name} 
                  amount={item.totalFormatted} 
                  color={item.color}
                />
              ))
            }
          </ContainerList>    
      }
    </Container>
  )
}
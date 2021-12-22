import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { HistoryCard } from "../../components/HistoryCard";
import { 
  Container, 
  Header, 
  Title,
  ContainerList,
  ChartContainer 
} from "./styles";
import { categories } from "../../Utils/categories";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from 'styled-components'
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
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])
  const theme = useTheme()
  async function loadData() {
    const dataKey = '@finances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expansive:TransactionData) => expansive.type === 'negative'
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
  }

  useEffect(()=>{
    loadData()
  },[])

  return(
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <ContainerList>
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
    </Container>
  )
}
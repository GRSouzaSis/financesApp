import React, { useCallback, useEffect, useState } from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  Logoutbutton,
  LoadContainer
} from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAuth } from '../../hooks/Auth';
export interface DataListProps {
  id: string;
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface HighlightProps {
  total: string;
  lastTransaction: string;  
}
interface HighlightData {
  entries: HighlightProps;
  expansives: HighlightProps;
  result: string;
  between?: string;
}

const Dashboard: React.FC = () => {
  const [isLoading, setIsloading] = useState(true)
  const [data, setData] = useState<DataListProps[]>([])
  const [hightlightData, setHightlightData] = useState<HighlightData>({} as HighlightData)
  const theme = useTheme();
  const { signOut, user } = useAuth();

  function getLastTransactionDate( collection : DataListProps[], type: 'positive' | 'negative'){
    
    const lastTransaction = 
    Math.max.apply(Math, collection
      .filter(transaction => transaction.type === type)
      .map(transaction => new Date(transaction.date).getTime())     
    )
   
    // return format(+lastTransaction, 'dd, MMMM', {locale: ptBR})
    // return Intl.DateTimeFormat('pt-BR', {
    //   day: '2-digit',
    //   month: 'long',
    // }).format(new Date(lastTransaction));
  }

  async function loadData(){  
   const dataKey = '@finances:transactions';

   const response = await AsyncStorage.getItem(dataKey);
   const transactions = response ? JSON.parse(response) : [];
   let entriesTotal = 0;
   let expensiveTotal = 0;

   const transactionsFormatted: DataListProps[] = transactions
   .map((item: DataListProps) => {
      if(item.type === 'positive'){
        entriesTotal += Number(item.amount);
      }else{
        expensiveTotal += Number(item.amount);
      }
      const amount = Number(item.amount)
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });   
      // const date = Intl.DateTimeFormat('pt-BR', {
      //   day: '2-digit',
      //   month: '2-digit',
      //   year: '2-digit'
      // }).format(new Date(item.date));      
      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date: format(new Date(item.date), 'dd/MM/yy', {locale: ptBR}),
      }
    })
    setData(transactionsFormatted) 
    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive')   
    const lastTransactionExpensive = getLastTransactionDate(transactions, 'negative')   
  
    const calcResult = entriesTotal - expensiveTotal;
    setHightlightData({
      entries: {
        total: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
      },
      expansives: {
        total: expensiveTotal.toLocaleString('pt-BR',{
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpensive}`,
      },
      result: calcResult.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }),
      between: `01 à ${lastTransactionExpensive}`,
    })
    setIsloading(false)
  }

  useEffect(()=> {
    loadData()
  },[])

  useFocusEffect(useCallback(()=>{
    setIsloading(true)
    loadData()
  },[]))

  return( 
    <Container>
      { isLoading ?
      <LoadContainer>
        <ActivityIndicator color={theme.colors.primary} size={'large'}/> 
      </LoadContainer> :
        <>        
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo source={{uri: user?.photo}}/>
                  <User>
                    <UserGreeting>Ola, </UserGreeting>
                    <UserName>{user.name}</UserName>
                  </User>
              </UserInfo>
              <Logoutbutton onPress={signOut}>
                <Icon name="power"/>
              </Logoutbutton>
            </UserWrapper>        
          </Header> 
          <HighlightCards>      
            <HighlightCard 
              type='up'
              title='Entradas' 
              amount={hightlightData?.entries.total}
              lastTransaction={hightlightData?.entries.lastTransaction}
            />
            <HighlightCard 
              type='down'
              title='Saídas' 
              amount={hightlightData?.expansives.total}
              lastTransaction={hightlightData?.expansives.lastTransaction}
            />
            <HighlightCard 
              type='total'
              title='Total' 
              amount={hightlightData?.result}
              lastTransaction={hightlightData.between}
            />
            
          </HighlightCards> 
          <Transactions>
            <Title>Listagem</Title>
            <TransactionList 
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <TransactionCard data={item} />}          
            />        
          </Transactions>
        </>
      }
    </Container>);
}

export default Dashboard;
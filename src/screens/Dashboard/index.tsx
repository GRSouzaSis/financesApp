import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
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
  Logoutbutton
} from './styles';

export interface DataListProps {
  id: string;
  type: 'positive' | 'negative';
  title: string;
  amount: string;
  category: {
    name: string,
    icon: string};
  date: string | Date;
}

const Dashboard: React.FC = () => {
  const data = [
  {
    id: '1',
    type: 'positive',
    title: 'teste',
    amount: 'R$ 10.254,00',
    category: {
      name: '254',
      icon: 'dollar-sign'
    }, 
    date: '10/10/2021', 
  },
  {
    id: '2',
    type: 'negative',
    title: 'teste',
    amount: 'R$ 1.254,00',
    category: {
      name: '254',
      icon: 'coffee'
    }, 
    date: '10/10/2021', 
  },
  {
    id: '3',
    type: 'positive',
    title: 'teste',
    amount: 'R$ 1.254,00',
    category: {
      name: '254',
      icon: 'shopping-bag'
    }, 
    date: '10/10/2021', 
  },
]

  return( 
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{uri: 'https://avatars.githubusercontent.com/u/55997169?v=4'}}/>
              <User>
                <UserGreeting>Ola, </UserGreeting>
                <UserName>Giva</UserName>
              </User>
          </UserInfo>
          <Logoutbutton onPress={()=>{}}>
            <Icon name="power"/>
          </Logoutbutton>
        </UserWrapper>        
      </Header> 
      <HighlightCards>      
        <HighlightCard 
          type='up'
          title='Entradas' 
          amount='R$ 17.000,00' 
          lastTransaction='Última entrada dia 13 de abril'
        />
        <HighlightCard 
          type='down'
          title='Saídas' 
          amount='R$ 1.000,00' 
          lastTransaction='Última saída dia 13 de abril'
        />
        <HighlightCard 
          type='total'
          title='Total' 
          amount='R$ 16.000,00' 
          lastTransaction='Última entrada dia 13 de abril'
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
    </Container>);
}

export default Dashboard;
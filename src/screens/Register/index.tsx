import React, { useState } from "react";
import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import { SelectCategory } from "../../components/Forms/SelectCategory";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from "./styles";

export default function Register(){
  const [transactionType, setTransactionType ] = useState('')
          
  const handleTransactionsTypesSelect = (type : 'up' | 'down') => {
    setTransactionType(type)
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="NAme"/>
          <Input placeholder="Valor"/>
            <TransactionsTypes>
              <TransactionTypeButton 
                title="Entrada" 
                type="up"
                onPress={()=> handleTransactionsTypesSelect('up')}
                isActive={transactionType === 'up'}
              />
              <TransactionTypeButton 
                title="Saída" 
                type="down"
                onPress={()=> handleTransactionsTypesSelect('down')}
                isActive={transactionType === 'down'}
              />
            </TransactionsTypes>
            <SelectCategory title="Categoria"/>
        </Fields>

        <Button title="Enviar"/>
      </Form>
    </Container>
  )
}
import React, { useState } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import { SelectCategory } from "../../components/Forms/SelectCategory";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import {CategorySelect} from "../CategorySelect";
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
  const [name, setName ] = useState('')
  const [amount, setAmount ] = useState('')
  const [categoeyModalOpen, setCategoeyModalOpen ] = useState(false)
  const [category, setCategory ] = useState({
    key: 'category',
    name: 'Categoria'
  });  
  
  const handleTransactionsTypesSelect = (type : 'up' | 'down') => {
    setTransactionType(type)
  }
  const handleOpenSelectCategoryModal = () => {
    setCategoeyModalOpen(true)
  }
  const handleCloseSelectCategoryModal = () => {
    setCategoeyModalOpen(false)
  }

  const handleSendRegister = () => {
    if(!transactionType)
      return Alert.alert('Selecione o tipo da transação');
    if(category.key === 'category')
      return Alert.alert('Selecione uma categoria');
    const data = {
      name: name,
      amount: amount,
      transactionType,
      category: category.key
    }
    console.log(data);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <Input
              placeholder="Nome"
              onChangeText={setName}
              autoCapitalize="sentences"
            />
            <Input
              placeholder="Valor"
              onChangeText={setAmount}
              keyboardType="numeric"
            /> 
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
              <SelectCategory
                onPress={handleOpenSelectCategoryModal} 
                title={category.name}
              />
          </Fields>

          <Button 
            title="Enviar"
            onPress={handleSendRegister}
          />

        </Form>
        <Modal visible={categoeyModalOpen}>
          <CategorySelect 
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}
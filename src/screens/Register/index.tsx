import React, { useState } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import { Button } from "../../components/Forms/Button";
import { InputForm } from "../../components/Forms/InputForm";
import { SelectCategory } from "../../components/Forms/SelectCategory";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import {CategorySelect} from "../CategorySelect";
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from "./styles";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup
  .string()
  .required('Nome é obrigatório'),
  amount: Yup
  .number()
  .typeError('Informe um valor')
  .positive('O valor não pode ser negativo')
})

export default function Register(){
  const navegation = useNavigation();
  const dataKey = '@finances:transactions';
  const [transactionType, setTransactionType ] = useState('')  
  const [categoeyModalOpen, setCategoeyModalOpen ] = useState(false)
  const [category, setCategory ] = useState({
    key: 'category',
    name: 'Categoria'
  });  

  const handleTransactionsTypesSelect = (type : 'positive' | 'negative') => {
    setTransactionType(type)
  }
  const handleOpenSelectCategoryModal = () => {
    setCategoeyModalOpen(true)
  }
  const handleCloseSelectCategoryModal = () => {
    setCategoeyModalOpen(false)
  }

  const { 
    control,
    handleSubmit,
    reset,
    formState: { errors }
   } = useForm({
    resolver: yupResolver(schema)
   });

  const handleSendRegister = async (form: FormData) => {
    if(!transactionType)
      return Alert.alert('Selecione o tipo da transação');
    if(category.key === 'category')
      return Alert.alert('Selecione uma categoria');    

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }

    try{     
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        newTransaction
      ]

      await AsyncStorage.setItem(dataKey,JSON.stringify(dataFormatted));
      reset();
      setTransactionType('')
      setCategory({
        key: 'category',
        name: 'Categoria'
      })
      navegation.navigate('Listagem');
    }catch(error){
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm 
              placeholder="Nome" 
              control={control}
              name="name"
              autoCapitalize="sentences"
              error={errors.name && errors.name.message}
            />
            <InputForm 
              placeholder="Valor" 
              control={control} 
              name="amount"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
              <TransactionsTypes>
                <TransactionTypeButton 
                  title="Entrada" 
                  type="up"
                  onPress={()=> handleTransactionsTypesSelect('positive')}
                  isActive={transactionType === 'positive'}
                />
                <TransactionTypeButton 
                  title="Saída" 
                  type="down"
                  onPress={()=> handleTransactionsTypesSelect('negative')}
                  isActive={transactionType === 'negative'}
                />
              </TransactionsTypes>
              <SelectCategory
                onPress={handleOpenSelectCategoryModal} 
                title={category.name}
              />
          </Fields>

          <Button 
            title="Enviar"
            onPress={handleSubmit(handleSendRegister)}
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
import React, { useState } from "react";
import { FlatList } from "react-native";
import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import { SelectCategory } from "../../components/Forms/SelectCategory";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { categories } from "../../Utils/categories";

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: string
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

import { 
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from "./styles";

export default function CategorySelect( {
  category,
  setCategory,
  closeSelectCategory
}: Props){
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList data={categories}
        style={{flex: 1, width: '100%'}}
        keyExtractor={(item) => item.key}
        renderItem={({item})=> (
          <Category>
            <Icon name={item.icon}/>
            <Name>{item.name}</Name>
          </Category>        
        )}
        ItemSeparatorComponent={() =><Separator />}
      />
      <Footer>
       <Button title="Selecionar"/>
      </Footer>
    </Container>
  )
}
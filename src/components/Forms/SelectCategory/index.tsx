import React from "react";
import { TextInputProps } from 'react-native'
import { 
  Container,
  Title,
  Icon,
} from "./styles";

interface Props {
  title: string;
}

export function SelectCategory({ title }: Props){
  return (
    <Container>
      <Title>{title}</Title>
      <Icon name="chevron-down"/>
    </Container>
  )
}
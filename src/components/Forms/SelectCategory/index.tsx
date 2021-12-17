import React from "react";
import { TextInputProps } from 'react-native'
import { 
  Container,
  Title,
  Icon,
} from "./styles";

interface Props {
  title: string;
  onPress: () => void;
}

export function SelectCategory({ title, onPress }: Props){
  return (
    <Container onPress={onPress}>
      <Title>{title}</Title>
      <Icon name="chevron-down"/>
    </Container>
  )
}
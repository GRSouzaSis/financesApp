import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";  

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme})=> theme.colors.background};  
`;

export const Header = styled.View`
  background-color: ${({theme})=> theme.colors.primary};
  width: 100%;
  height: ${RFValue(113)}px;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 20px;
`;
export const Title = styled.Text`
  font-family: ${({theme})=> theme.fonts.regular};
  color: ${({theme})=> theme.colors.shape};
  font-size: ${RFValue(18)}px;
`;
export const Form = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: space-between;
`;

export const Fields = styled.View``;

export const TransactionsTypes = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;
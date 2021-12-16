import styled from "styled-components/native";  
import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity.attrs({
  actveOpacity: 0.7
})`
  background-color:${({theme})=> theme.colors.shape};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;  
  border-radius: 6px;
  padding: 16px;
  margin-top: 16px;
`;

export const Title = styled.Text`
  font-family: ${({theme})=> theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({theme})=> theme.colors.textDark};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: 12px;
  color: ${({theme})=> theme.colors.text};

`;

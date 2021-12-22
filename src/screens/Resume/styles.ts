import styled from "styled-components/native";  
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme})=> theme.colors.background};  
`;

export const ChartContainer = styled.View`
  justify-content:center;
  align-items: center;
`;

export const ContainerList = styled.ScrollView`
  flex: 1;
  background-color: ${({theme})=> theme.colors.background};
  padding: 16px;
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

export const MonthSelect = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

export const MonthSelectButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

export const SelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  font-family: ${({theme})=> theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({theme})=> theme.colors.textDark}; 
`;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
import styled, {css} from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import { RFValue } from "react-native-responsive-fontsize";

interface TypeProps {
  type: 'up' | 'down';
}

interface ButtonProps {
  isActive: boolean;
  type: 'up' | 'down';
}

export const Container = styled.TouchableOpacity<ButtonProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-width:  ${({isActive})=> isActive ? 0 : 1.2}px;
  padding: 16px;
  border-radius: 6px;

  ${({isActive, type })=> isActive && type === 'up' && css`
    background-color: ${({theme})=> theme.colors.successLight};
  `}

  ${({isActive, type })=> isActive && type === 'down' && css`
    background-color: ${({theme})=> theme.colors.attentionLight};
  `}
`;

export const Title = styled.Text`
  font-family: ${({theme})=> theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({theme})=> theme.colors.textDark};
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({theme, type})=> 
    type === 'up' ? theme.colors.success : theme.colors.attention
  };

`;

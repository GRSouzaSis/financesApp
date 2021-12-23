import React from "react";
import { TouchableOpacityProps } from "react-native";
import { SvgProps } from "react-native-svg";
import { RFValue } from "react-native-responsive-fontsize";
import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { 
  Button,
  ImageContainer,
  Title,
} from "./styles";

interface Props extends TouchableOpacityProps{
  title: string;
  svg: React.FC<SvgProps>;
}

export function SignInSocialButton({ 
  title, 
  svg: Svg, 
  ... rest 
}: Props){ 
  return (
    <Button {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Title>
        {title}
      </Title>
    </Button>
  )
}
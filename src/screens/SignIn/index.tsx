import React, { useState } from "react";
import { ActivityIndicator, Alert } from 'react-native'
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/Auth";
import { 
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWeapper,
} from "./styles";

export function SignIn(){ 
  const [ isLoading, setIsLoading ] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth()

  const theme = useTheme()

  async function handleSignInWithGoogle(){
    try{
      setIsLoading(true);
     return await signInWithGoogle()
    }catch ( error) {
      console.log(error)
      Alert.alert('Não foi possível conectar a conta Google')
    }finally{
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple(){
    try{
      setIsLoading(true);
     return await signInWithApple()
    }catch ( error) {
      console.log(error)
      Alert.alert('Não foi possível conectar a conta Apple')
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg 
            width={RFValue(120)}
            height={RFValue(68)}
          />
          <Title>
            {`Controle suas\nfinanças de forma\nmuito simples`}
          </Title>
        </TitleWrapper>
        <SignInTitle>{`Faça seu login com\numa das contas abaixo`}</SignInTitle>
      </Header>

      <Footer>
        <FooterWeapper>
          <SignInSocialButton 
            title="Entrar com Google" 
            svg={GoogleSvg} 
            onPress={handleSignInWithGoogle}
          />
          <SignInSocialButton 
            title="Entrar com Apple" 
            svg={AppleSvg} 
            onPress={handleSignInWithApple}
          />
        </FooterWeapper>
        {isLoading && 
          <ActivityIndicator 
            color={theme.colors.shape} 
            size='large' 
          />
        }
      </Footer>
    </Container>
  )
}
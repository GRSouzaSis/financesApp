import React from "react";
import { Alert } from 'react-native'
import { RFValue } from "react-native-responsive-fontsize";
import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
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
  const { signInWithGoogle } = useAuth()

  async function handleSignInWithGoogle(){
    try{
      await signInWithGoogle()
    }catch ( error) {
      console.log(error)
      Alert.alert('Não foi possível conectar a conta')
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
          <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} />
        </FooterWeapper>
      </Footer>
    </Container>
  )
}
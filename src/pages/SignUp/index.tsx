import React, { useRef, useCallback } from 'react';
import { 
  Image, 
  View, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  TextInput,
  Alert
} from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup'

import api from "../../services/apiClient";

import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";


import getValidationsErrors from '../../utils/getValidationsErros'
import Input from '../../components/input';
import Button from '../../components/button';

import logoImg from '../../assets/logo.png';


import { Container, Title, BackToSignInButton, BackToSignInText } from './styles';


interface SignUpFormData {
  name: string;
  email: string;
  passwoard: string;
}

 const SignUp: React.FC = () => {
   const formRef = useRef<FormHandles>(null);
   const navigation = useNavigation();

   const emailInputRef = useRef<TextInput>(null);
   const passwordInputRef = useRef<TextInput>(null);

   const handleSignUp = useCallback( async (data: object) => {
    try{
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
            name: Yup.string()
              .required('Nome Obrigatório'),
            email: Yup.string()
              .required('E-mail Obrigatório')
              .email('Digite o Email Válido'),
            password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });
        
        await schema.validate(data, {
            abortEarly: false,
        })
        await api.post('/users', data);

        Alert.alert(
          'Cadastro realizado com Sucesso', 
          'Voce ja pode fazer login na Aplicação'
          )

        navigation.goBack();

        Alert.alert('Cadastro realizado!', 'Você ja pode fazer seu logon')

    }catch (err){
        if (err instanceof Yup.ValidationError) {
            const errors = getValidationsErrors(err)
            formRef.current?.setErrors(errors);

            return;
        
        }
        Alert.alert('Erro no Cadastro', 'Ocorreu um erro ao fazer cadastro, tente novamente');
            }
        }, 
        [navigation]
        )


 
   return(
    <>
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView 
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1}}
        >
        <Container>
          <Image source={logoImg} />
          <View>
            <Title>Crie sua conta</Title>
          </View>
            <Form ref={formRef} onSubmit={handleSignUp}>

              <Input 
                autoCapitalize="words"
                name="name" 
                icon="user" 
                placeholder="Nome" 
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />

              <Input 
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email" 
                icon="mail" 
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input 
                ref={passwordInputRef}
                secureTextEntry 
                name="password" 
                icon="lock" 
                placeholder="Senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}

              />

              <Button onPress={() => formRef.current?.submitForm()}>Cadastrar</Button>
            </Form>

        </Container>
        </ScrollView>
        <BackToSignInButton onPress={() => navigation.goBack()}>
            <BackToSignInText>
              <Icon name="arrow-left" size={20} color="#fff" />   Voltar ao Logon</BackToSignInText>
          </BackToSignInButton>
      </KeyboardAvoidingView>
    </>
    
   );
 };
export default SignUp;
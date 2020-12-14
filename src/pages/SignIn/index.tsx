import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Form} from '@unform/mobile';
import { FormHandles } from '@unform/core';
import logoImg from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { 
  Container, 
  Title, 
  ForgotPassword, 
  ForgotPasswordText, 
  CreateAccountButton, 
  CreateAccountButtonText 
} from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const passwordInputRef = useRef<TextInput>(null);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleSignIn = useCallback((data: object) => {
    console.log(data);
  }, [])

  return (
    <>
      <KeyboardAvoidingView 
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Faça seu login</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input 
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
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
                name="password" 
                icon="lock" 
                placeholder="Senha" 
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
            </Form>
            <ForgotPassword>
              <ForgotPasswordText>Esqueci minha Senha</ForgotPasswordText>
            </ForgotPassword>
            
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton onPress={() => {navigation.navigate('SignUp')}}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
)
};

export default SignIn;

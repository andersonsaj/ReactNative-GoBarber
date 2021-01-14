import React, {useCallback, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  TextInput,
  Alert,
} from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {FormHandles} from '@unform/core';
import Input from '../../components/Input';
import {
  Container,
  BackButton,
  Title,
  UserAvatarButton,
  UserAvatar,
} from './styles';
import getValidationErrors from '../../../utils/getValidationErros';
import api from '../../services/api';
import {useAuth} from '../../hooks/auth';
import Button from '../../components/Button';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const {user, updatedUser, signOut} = useAuth();
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
        });

        await schema.validate(data, {abortEarly: false});

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.post('/profile', formData);

        updatedUser(response.data);

        Alert.alert('Perfil atualizado com sucesso!');

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
        Alert.alert(
          'Erro na atualização do perfil',
          'Ocorreu um erro ao atualização seu perfil, tente novamente',
        );
      }
    },
    [navigation, updatedUser],
  );

  // const handleUpdatedAvatar = useCallback(() => {
  //   launchImageLibrary(
  //     {
  //       mediaType: 'photo',
  //       quality: 1,
  //     },
  //     response => {
  //       if (response.didCancel) {
  //         return;
  //       }
  //       if (response.errorMessage) {
  //         Alert.alert('Erro ao atualizar seu avatar.');
  //         return;
  //       }
  //       const source = { uri: response.uri };
  //       const data = new FormData();
  //       data.append('avatar', {
  //         type: 'image/jpeg',
  //         name: `${user.id}.jpg`,
  //         uri: response.uri,
  //       });
  //       api.patch('users/avatar', data).then(res => {
  //         updatedUser(res.data);
  //       });
  //     },
  //   );
  // }, [updatedUser, user.id]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <Container>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>
            <UserAvatarButton onPress={() => {}}>
              <UserAvatar source={{uri: user.avatar_url}} />
            </UserAvatarButton>
            <View>
              <Button onPress={signOut}>Sair</Button>
              <Title>Meu perfil</Title>
            </View>
            <Form initialData={user} ref={formRef} onSubmit={handleSignUp}>
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
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  oldPasswordInputRef.current?.focus();
                }}
              />
              <Input
                ref={oldPasswordInputRef}
                name="old_password"
                icon="lock"
                placeholder="Senha atual"
                secureTextEntry
                returnKeyType="next"
                containerStyle={{marginTop: 16}}
                textContentType="newPassword"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Nova senha"
                secureTextEntry
                returnKeyType="next"
                textContentType="newPassword"
                onSubmitEditing={() => {
                  passwordConfirmationInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordConfirmationInputRef}
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar senha"
                secureTextEntry
                returnKeyType="send"
                textContentType="newPassword"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button
                style={{marginBottom: 80}}
                onPress={() => formRef.current?.submitForm()}>
                Confirmar mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;

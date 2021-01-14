import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useAuth} from '../../hooks/auth';
import api from '../../services/api';
import {
  Contanier,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProviderListTitle,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const {user} = useAuth();
  const {navigate} = useNavigation();
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    api
      .get('providers')
      .then((response) => {
        setProviders(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToCreateAppoitment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', {providerId});
    },
    [navigate],
  );

  return (
    <Contanier>
      <Header>
        <HeaderTitle>
          Ben vindo,
          {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{uri: user.avatar_url}} />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={(provider) => provider.id}
        ListHeaderComponent={
          <ProviderListTitle>Cabeleireiros</ProviderListTitle>
        }
        renderItem={({item: provider}) => (
          <ProviderContainer
            key={provider.id}
            onPress={() => navigateToCreateAppoitment(provider.id)}>
            <ProviderAvatar source={{uri: provider.avatar_url}} />
            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>
              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <ProviderMetaText>Segunda á sexta</ProviderMetaText>
              </ProviderMeta>
              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderMetaText>8h á 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Contanier>
  );
};

export default Dashboard;

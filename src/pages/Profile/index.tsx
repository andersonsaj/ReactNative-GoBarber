import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../../hooks/auth';

const Profile: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 50,
        }}
      >
        Hello
      </Text>
      <Button title="sair" onPress={signOut} />
    </View>
  );
};

export default Profile;

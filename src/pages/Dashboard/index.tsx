import React from 'react';
import { Text, View, Button } from 'react-native';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

    return(
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex:1}}
      >
        <Text style={{
          color: '#fff', 
          fontSize: 50, 
        }}
        >
          Hello
        </Text>
        <Button title="Sair" onPress={signOut} />
      </View>
    )
}

export default Dashboard;
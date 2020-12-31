import React from 'react';
import { Text, View } from 'react-native';

const CreateAppointment: React.FC = () => {
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
    </View>
  );
};

export default CreateAppointment;

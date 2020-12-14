import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
    height: 60px;
    padding: 0 16px;
    background: #ff9000;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
`;

export const ButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: #312e38;
    font-size: 18px;
`;
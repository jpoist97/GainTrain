import * as React from 'react';
import { Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth-context';
import { useNavigation } from '@react-navigation/native';

const Container = styled(SafeAreaView)`
   display: flex;
   justify-content: center;
   align-items: center;
   height: 100%;
`;

const Title = styled(Text)`
   font-size: 26px;
   font-weight: 600;
   margin-bottom: 20px;
`;

const StyledInput = styled(TextInput)`
   margin-top: 20px;
   background-color: #e8e8e8;
   border-radius: 5px;
   padding: 5px;
   width: 80%;
`;

const StyledButton = styled(TouchableOpacity)`
   width: 80%;
   border-radius: 5px;
   height: 35px;
   display: flex;
   justify-content: center;
   align-items: center;
   margin-top: 20px;
`;

const SignInScreen = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const { signIn } = useContext(AuthContext);
   const navigation = useNavigation();

   return (
      <Container>
         <Title>Sign In</Title>
         <StyledInput
            placeholder="Email"
            onChangeText={setUsername}
            value={username}
         />
         <StyledInput
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
         />
         <StyledButton
            onPress={() => {
               signIn({ email: username, password });
            }}
         >
            <Text>Sign In</Text>
         </StyledButton>
         <StyledButton
            onPress={() => {
               navigation.push('SignUp');
            }}
         >
            <Text>Don't have an account? Sign up!</Text>
         </StyledButton>
      </Container>
   );
};

export default SignInScreen;

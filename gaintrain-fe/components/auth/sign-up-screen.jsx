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

const SignUpScreen = () => {
   const [name, setName] = useState('');
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const { signUp } = useContext(AuthContext);
   const navigation = useNavigation();

   return (
      <Container>
         <Title>Sign Up</Title>
         <StyledInput placeholder="Name" onChangeText={setName} value={name} />
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
               signUp({ email: username, password, name });
            }}
         >
            <Text>Sign Up</Text>
         </StyledButton>
         <StyledButton
            onPress={() => {
               navigation.goBack();
            }}
         >
            <Text>Already have an account? Sign in!</Text>
         </StyledButton>
      </Container>
   );
};

export default SignUpScreen;

import * as React from 'react';
import { Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { useState } from 'react';

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

   const onSignup = () => {
      console.log('Signing up');
   };

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
         <StyledButton onPress={onSignup}>
            <Text>Sign Up</Text>
         </StyledButton>
      </Container>
   );
};

export default SignUpScreen;

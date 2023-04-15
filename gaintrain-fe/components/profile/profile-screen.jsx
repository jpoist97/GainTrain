import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { AuthContext } from '../../context/auth-context';
import { useContext } from 'react';

const StyledButton = styled(TouchableOpacity)`
   width: 80%;
   border-radius: 5px;
   height: 35px;
   display: flex;
   justify-content: center;
   align-items: center;
   margin-top: 20px;
`;


const ProfileScreen = () => {
   const { signOut } = useContext(AuthContext);
   return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <Text>Profile!</Text>
         <StyledButton onPress={() => { signOut() }}>
            <Text>Sign out</Text>
         </StyledButton>
      </View>
   );
};

export default ProfileScreen;

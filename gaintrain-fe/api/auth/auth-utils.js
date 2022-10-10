import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { POOL_DATA } from '../environment';
import Toast from 'react-native-toast-message';

export async function signIn(email, password, setAuthentication) {
   const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: email,
      Password: password,
   });

   const userPool = getUserPool();
   const user = new AmazonCognitoIdentity.CognitoUser({
      Username: email,
      Pool: userPool,
   });

   user.authenticateUser(authDetails, {
      onSuccess: (res) => {
         // Store the sub somewhere global
         console.log(res.accessToken.payload.sub);
         Toast.show({
            type: 'success',
            text1: 'Signed in successfully!',
         });
      },
      onFailure: (err) => {
         Toast.show({
            type: 'error',
            text1: err.message,
         });
      },
   });
}

export async function signUp(email, password, name) {
   const userPool = getUserPool();
   userPool.signUp(
      email,
      password,
      [
         {
            Name: 'name',
            Value: name,
         },
         {
            Name: 'email',
            Value: email.toLowerCase(),
         },
      ],
      null,
      (err, res) => {
        if (err) {
            Toast.show({
                type: 'error',
                text1: err.message,
            })
        } else {
            Toast.show({
                type: 'success',
                text1: 'Signed up successfully',
            })
        }
      }
   );
}

function getUserPool() {
   return new AmazonCognitoIdentity.CognitoUserPool(POOL_DATA);
}

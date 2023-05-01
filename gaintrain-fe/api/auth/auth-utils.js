import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { POOL_DATA } from '../environment';
import Toast from 'react-native-toast-message';

export async function cognitoSignIn(email, password, updateAuthContext) {
   const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: email,
      Password: password,
   });

   const userPool = getUserPool();
   const user = new AmazonCognitoIdentity.CognitoUser({
      Username: email,
      Pool: userPool,
   });

   return authenticateUserPromise(user, authDetails);
}

async function authenticateUserPromise(user, authDetails) {
   return new Promise((resolve, reject) => {
      user.authenticateUser(authDetails, {
         onSuccess: (res) => {
            resolve({ userSub: res.accessToken.payload.sub });
         },
         onFailure: (err) => {
            reject(err);
         },
      });
   });
}

export async function cognitoSignUp(email, password, name) {
   const userPool = getUserPool();
   return signUpPromise({ userPool, email, password, name });
}

async function signUpPromise({ userPool, email, password, name }) {
   return new Promise((resolve, reject) => {
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
               reject(err);
            } else {
               resolve({ userSub: res.userSub });
            }
         }
      );
   });
}

function getUserPool() {
   return new AmazonCognitoIdentity.CognitoUserPool(POOL_DATA);
}

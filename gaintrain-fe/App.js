import * as React from 'react';
import { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/home/home-screen';
import CyclesScreen from './components/cycles/cycles-screen';
import WorkoutsScreen from './components/workouts/workouts-screen';
import ProfileScreen from './components/profile/profile-screen';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import * as Notifications from 'expo-notifications';
import { useFonts } from 'expo-font';
import { MenuProvider } from 'react-native-popup-menu';
import * as SecureStore from 'expo-secure-store';
import SignInScreen from './components/auth/sign-in-screen';
import SignUpScreen from './components/auth/sign-up-screen';
import { cognitoSignIn, cognitoSignUp } from './api/auth/auth-utils';
import { AuthContext } from './context/auth-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

Notifications.setNotificationHandler({
   handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
   }),
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
   const [fontsLoaded] = useFonts({
      'Inter-Medium': require('./assets/fonts/Inter/static/Inter-Medium.ttf'),
      'Inter-Bold': require('./assets/fonts/Inter/static/Inter-Bold.ttf'),
      'Source-Sans-Pro': require('./assets/fonts/Source_Sans_Pro/SourceSansPro-Regular.ttf'),
   });
   const [state, dispatch] = React.useReducer(
      (prevState, action) => {
         switch (action.type) {
            case 'RESTORE_TOKEN':
               return {
                  ...prevState,
                  userSub: action.userSub,
                  isLoading: false,
               };
            case 'SIGN_IN':
               return {
                  ...prevState,
                  isSignout: false,
                  userSub: action.userSub,
               };
            case 'SIGN_OUT':
               return {
                  ...prevState,
                  isSignout: true,
                  userSub: null,
               };
         }
      },
      {
         isLoading: true,
         isSignout: false,
         userSub: null,
      }
   );

   React.useEffect(() => {
      // Fetch the token from storage then navigate to our appropriate place
      const bootstrapAsync = async () => {
         let userSub;

         try {
            userSub = await SecureStore.getItemAsync('userSub');
         } catch (e) {
            // Restoring token failed
         }

         dispatch({ type: 'RESTORE_TOKEN', userSub });
      };

      bootstrapAsync();
   }, []);

   const authContext = {
      signIn: async ({ email, password }) => {
         // TODO: Return accessToken from here once we need to use it
         try {
            const { userSub, accessToken } = await cognitoSignIn(
               email,
               password
            );
            dispatch({ type: 'SIGN_IN', userSub, accessToken });
            await SecureStore.setItemAsync('userSub', userSub);
            Toast.show({
               type: 'success',
               text1: 'Signed in successfully!',
            });
         } catch (err) {
            Toast.show({
               type: 'error',
               text1: err.message,
            });
         }
      },
      signOut: async () => {
         await SecureStore.deleteItemAsync('userSub');
         dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async ({ email, password, name }) => {
         // TODO: Return accessToken from here once we need to use it
         let userSub, accessToken;
         try {
            const { userSub, accessToken } = await cognitoSignUp(
               email,
               password,
               name
            );
            dispatch({ type: 'SIGN_IN', userSub, accessToken });
            await SecureStore.setItemAsync('userSub', userSub);
            Toast.show({
               type: 'success',
               text1: 'Signed up successfully',
            });
         } catch (err) {
            Toast.show({
               type: 'error',
               text1: err.message,
            });
         }
      },
      getUserSub: () => {
         return state.userSub;
      },
   };

   if (!fontsLoaded) {
      return null;
   }

   return (
      <>
         <AuthContext.Provider value={authContext}>
            <NavigationContainer>
               {!state.userSub ? (
                  <Stack.Navigator>
                     <Stack.Screen
                        name="SignIn"
                        component={SignInScreen}
                        options={{ headerShown: false }}
                     />
                     <Stack.Screen
                        name="SignUp"
                        component={SignUpScreen}
                        options={{ headerShown: false }}
                     />
                  </Stack.Navigator>
               ) : (
                  <MenuProvider>
                     <Tab.Navigator
                        screenOptions={({ route }) => ({
                           tabBarIcon: ({ color, size }) => {
                              if (route.name === 'Home') {
                                 return (
                                    <Entypo
                                       name="home"
                                       size={size}
                                       color={color}
                                    />
                                 );
                              }
                              if (route.name === 'Workouts') {
                                 return (
                                    <FontAwesome5
                                       name="dumbbell"
                                       size={size}
                                       color={color}
                                    />
                                 );
                              }
                              if (route.name === 'Cycles') {
                                 return (
                                    <Entypo
                                       name="cycle"
                                       size={size}
                                       color={color}
                                    />
                                 );
                              }
                              if (route.name === 'Profile') {
                                 return (
                                    <FontAwesome5
                                       name="user-circle"
                                       size={size}
                                       color={color}
                                    />
                                 );
                              }
                           },
                           tabBarActiveTintColor: 'purple',
                           tabBarInactiveTintColor: 'gray',
                           headerShown: false,
                        })}
                     >
                        <Tab.Screen name="Home" component={HomeScreen} />
                        <Tab.Screen
                           name="Workouts"
                           component={WorkoutsScreen}
                        />
                        <Tab.Screen name="Cycles" component={CyclesScreen} />
                        <Tab.Screen name="Profile" component={ProfileScreen} />
                     </Tab.Navigator>
                  </MenuProvider>
               )}
            </NavigationContainer>
            <Toast />
         </AuthContext.Provider>
      </>
   );
}

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/home/home-screen';
import CyclesScreen from './components/cycles/cycles-screen';
import WorkoutsScreen from './components/workouts/workouts-screen';
import ProfileScreen from './components/profile/profile-screen';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const Tab = createBottomTabNavigator();

export default function App() {
   return (
      <>
         <NavigationContainer>
            <Tab.Navigator
               screenOptions={({ route }) => ({
                  tabBarIcon: ({ color, size }) => {
                     if (route.name === 'Home') {
                        return <Entypo name="home" size={size} color={color} />;
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
                           <Entypo name="cycle" size={size} color={color} />
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
               <Tab.Screen name="Workouts" component={WorkoutsScreen} />
               <Tab.Screen name="Cycles" component={CyclesScreen} />
               <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
         </NavigationContainer>
         <Toast />
      </>
   );
}

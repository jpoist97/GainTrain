import * as React from 'react';
import { Text, View } from 'react-native';
import NotificationButton from '../log-workout/notification-button';

const HomeScreen = () => {
   return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <NotificationButton />
      </View>
   );
};

export default HomeScreen;

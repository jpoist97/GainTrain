import * as React from 'react';
import * as Notifications from 'expo-notifications';
import { Text, TouchableOpacity } from 'react-native';

const NotificationButton = () => {
   const scheduleNotification = (seconds) => {
      Notifications.scheduleNotificationAsync({
         content: {
            title: 'Rest timer is up',
            body: 'Start your new set!',
         },
         trigger: {
            seconds,
         },
      });
   };

   return (
      <TouchableOpacity
         onPress={() => {
            scheduleNotification(70);
         }}
      >
         <Text>Schedule Notification</Text>
      </TouchableOpacity>
   );
};

export default NotificationButton;

import * as React from 'react';
import { Text, View } from 'react-native';
import WorkoutCard from '../workouts/workout-card';

const HomeScreen = () => {
   return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <WorkoutCard
            name='Legs A'
            description='Short decription about workout'
            sets={20}
            reps={160}
            muscleGroups={['Biceps', 'Legs']}
         />
      </View>
   );
};

export default HomeScreen;

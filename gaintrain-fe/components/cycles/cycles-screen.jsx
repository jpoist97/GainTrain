import * as React from 'react';
import { Text, View } from 'react-native';
import CyclesCard from '../cycles/cycles-card';

const CyclesScreen = () => {
   return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <Text>Cycles!</Text>
         <CyclesCard
            name="Cycle 1"
            description="Short decription about cycle"
            days={6}
            workouts={['Legs A', 'Push A', 'Pull A', 'Arms A', 'Legs B', 'Push B']}
         />
      </View>
   );
};

export default CyclesScreen;

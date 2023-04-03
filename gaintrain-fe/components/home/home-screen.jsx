import * as React from 'react';
import { Text, View } from 'react-native';
import BaseCard from '../base-components/base-card';

const HomeScreen = () => {
   return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <BaseCard
            title='Legs A'
            subtitle='Short decription about workout'
            // BodyComponent={<View style={{ height: 100 }}><Text>HELLo</Text></View>}
            options={[{ text: 'Edit workout' }]}
         />
      </View>
   );
};

export default HomeScreen;

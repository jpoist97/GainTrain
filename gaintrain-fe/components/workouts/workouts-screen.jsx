import * as React from 'react';
import { useEffect, useContext, useState } from 'react';
import { listWorkouts } from '../../api/workouts/workouts-api';
import { AuthContext } from '../../context/auth-context';
import WorkoutCard from './workout-card';
import styled from 'styled-components/native';
import SkeletonList from '../loading/skeleton-list';

const StyledList = styled.FlatList`
   width: 100%;
   height: 100%;
`;

const Container = styled.SafeAreaView`x
   height: 100%;
`;

const Title = styled.Text`
   font-family: 'Inter-Bold';
   font-style: normal;
   font-weight: 700;
   font-size: 34px;
   line-height: 30px;
   margin-left: 30px;
   margin-top: 20px;
`;

const StyledWorkoutCard = styled(WorkoutCard)`
   margin-top: 10px;
   width: 90%;
`;

const Cont = styled.View`
   width: 90%;
   margin-top: 10px;
   margin-left: 5%;
`

const WorkoutsScreen = () => {
   const [loading, setLoading] = useState(true);
   const [workouts, setWorkouts] = useState([]);
   const { getUserSub } = useContext(AuthContext);

   const loadWorkouts = async () => {
      const userWorkouts = await listWorkouts(getUserSub());
      setWorkouts(userWorkouts);
      setLoading(false);
   }

   useEffect(() => {
      loadWorkouts();
   }, []);

   return (
      <Container>
         <Title>Workouts</Title>
         {loading ? <SkeletonList numCards={5}/> :
            <StyledList
               data={workouts}
               renderItem={({ item: { name, description, sets, reps, muscleGroups } }) => {
                  return (
                     <Cont>
                        <StyledWorkoutCard
                           name={name}
                           description={description}
                           sets={sets}
                           reps={reps}
                           muscleGroups={muscleGroups}
                        />
                     </Cont>
                  )
               }}
               keyExtractor={({ wokroutId }) => wokroutId}
            />
         }
      </Container>
   );
};

export default WorkoutsScreen;

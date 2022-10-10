import axios from 'axios';
import { PROD_URL } from '../environment';

const WORKOUTS_URL = `${PROD_URL}/workouts`;

export async function createWorkout(userSub, workout) {
   await axios.post(WORKOUTS_URL, workout, {
      params: {
         userSub,
      },
   });
}

export async function getWorkout(userSub, workoutId) {
   const response = await axios.get(`${WORKOUTS_URL}/${workoutId}`, {
      params: {
         userSub,
      },
   });

   return response.data;
}

export async function listWorkouts(userSub) {
   const response = await axios.get(WORKOUTS_URL, {
      params: {
         userSub,
      },
   });

   return response.data.workouts;
}

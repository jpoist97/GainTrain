import axios from 'axios';
import { PROD_URL } from '../environment';

const CYCLES_URL = `${PROD_URL}/cycles`;

export async function createCycle(userSub, cycle) {
   await axios.post(CYCLES_URL, cycle, {
      params: {
         userSub,
      },
   });
}

export async function getCycle(userSub, cycleId) {
   const response = await axios.get(`${CYCLES_URL}/${cycleId}`, {
      params: {
         userSub,
      },
   });

   return response.data;
}

export async function listCycles(userSub) {
   const response = await axios.get(CYCLES_URL, {
      params: {
         userSub,
      },
   });

   return response.data.cycles;
}

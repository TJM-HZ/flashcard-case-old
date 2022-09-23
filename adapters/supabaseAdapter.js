import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config({ path: 'variables.env' });

//TODO: to improve this code, you might consider working with models as well. A model is then a representation of a resource.
//TODO: write some generic select, update, delete code to improve the code. However, do not write your own framework ☺️

console.log('url', process.env.SUPABASE_URL);

// my supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

/**
 * Function to get the data from one appointment
 * 
 * @param {*} id the id form a appointment
 * @returns appointment data
 */
export async function getCardData(id) {
  console.log('Look for id:', id);
  const { data, error } = await supabase.from('cards').select('*').eq('id', id);
  if (error) console.log('query error', error);
  else return data;
}

/**
 * function to read all the appointments
 * @returns an array of appointments
 */
export async function getCardsData() {
  const { data, error } = await supabase.from('cards').select('*');
  if (error) console.log('query error', error);
  else return data;
}

/**
 * Function to get the timeslot number
 * 
 * @param {*} timeSlotNumber the id of a timeSlot
 * @returns an specific timeslot
 */
async function getTimeslot(timeSlotNumber){
  console.log('👀 for id:', timeSlotNumber);
  const { data, error } = await supabase.from('timeslot').select('id').eq('nr', timeSlotNumber);
  if (error) console.log('query error', error);
  else return data;
}

/**
 * Function to write a specific appointment
 * @param {*} card 
 * @returns 
 */
export async function setCardData(card) {
  // find the id
  const timeSlotId = await getTimeslot(card.timeslot)
  console.log('timeSlotId', timeSlotId[0].id);
  const { data, error } = await supabase.from('cards').insert([
    {
      date: card.date,
      timeslot: timeSlotId[0].id,
      state: 'unchecked',
      pet: card.pet,
    },
  ]);
  if (error) console.log('Error', error);
  else return data;
}

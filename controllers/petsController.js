import { getDataPromise } from '../adapters/googleSheetAdapter.js';

export async function getCards(req, res){
  const rows = await getDataPromise();
  res.json(rows);
}
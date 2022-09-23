import {
  getCardData,
  setCardData,
  getCardsData,
} from '../adapters/supabaseAdapter.js';

export async function getCard(req, res) {
  const rows = await getCardData(req.params.id);
  res.json(rows);
}

export async function getCards(req, res) {
  const cards = [];
  const rows = await getCardsData();
  if (rows.length > 0) {
    rows.map((card) => {
      cards.push({
        url_to_self: req.originalUrl,
        date: card.date,
        state: card.state,
        timeslot: card.timeslot,
      });
    });
    res.json(cards);
  } else {
    res.status(500);
    res.json({
      title: 'no cards found',
      message: `🥴 We did something wrong`,
    });
  }
}

export async function setCard(req, res) {
  const card = {};
  if (req.body.pet && req.body.timeslot && req.body.date) {
    card.pet = req.body.pet;
    card.date = req.body.date;
    card.timeslot = req.body.timeslot;
    const rows = await setCardData(card);
    if (rows.length >= 0) {
      res.json({
        title: 'Card is added',
        message: `📅 Card for ${card.deck} is made on ${card.date} at ${card.timeslot}`,
      });
    } else {
      res.status(500);
      res.json({
        title: 'cannot add card',
        message: `Unknown causes`,
      });
    }
  } else {
    res.status(422);
    res.json({
      title: 'cannot add card',
      message: `You need to set client, date and time`,
    });
  }
}

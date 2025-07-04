// const { databases } = require('./utils');
// const { DATABASE_ID, COLLECTION_ID } = require('./constants');

export default async ({ req, res }) => {
  
  try {
  return res.json({message: 'done exercuting...'},200);
  } catch (err) {
  return res.json({ error: err.message },500);
  }
};

import mongoose from 'mongoose';

const database = async () => {
  try {
    // Replace database value in the .env file with your database config url
    const DATABASE =
      process.env.NODE_ENV === 'test'
        ? process.env.DATABASE_TEST
        : process.env.DATABASE;

    await mongoose.connect(DATABASE);
    console.info('Connected to the database.');
  } catch (error) {
    console.error('Could not connect to the database.', error);
  }
};
export default database;

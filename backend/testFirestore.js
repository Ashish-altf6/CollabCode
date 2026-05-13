const { db } = require('./config/firebaseAdmin');

async function test() {
  console.log('Testing Firestore connection...');
  try {
    const snapshot = await db.collection('test').get();
    console.log('Connection successful! Found', snapshot.size, 'documents.');
  } catch (err) {
    console.error('Connection failed:', err.message);
    if (err.message.includes('NOT_FOUND')) {
      console.log('HINT: This usually means the Firestore database has not been created in the console.');
    }
  }
}

test();

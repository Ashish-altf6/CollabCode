const admin = require('firebase-admin');

// You can either provide the path to your serviceAccountKey.json
// or set the GOOGLE_APPLICATION_CREDENTIALS environment variable.
// Alternatively, you can parse a JSON string from an environment variable.

let db;

try {
  if (admin.apps.length === 0) {
    let credential;
    if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
      credential = admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON));
    } else {
      try {
        const serviceAccount = require('../serviceAccountKey.json');
        credential = admin.credential.cert(serviceAccount);
      } catch (err) {
        console.warn('Firebase Admin: serviceAccountKey.json not found.');
      }
    }

    if (credential) {
      admin.initializeApp({ credential });
      console.log('Firebase Admin initialized successfully.');
    } else {
      console.error('Firebase Admin: No credentials provided (env or file).');
    }
  }
  
  if (admin.apps.length > 0) {
    db = admin.firestore();
  }
} catch (err) {
  console.error("Firebase Admin initialization error:", err.message);
}


module.exports = { admin, db };

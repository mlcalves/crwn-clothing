const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Download this from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const SHOP_DATA = require('./shop-data-new.json'); // Replace with your JSON file

const importData = async () => {
  const batch = db.batch();

  SHOP_DATA.forEach((category) => {
    const docRef = db.collection('categories').doc(category.title.toLowerCase());
    batch.set(docRef, category);
  });

  await batch.commit();
  console.log('Data successfully imported!');
};

importData().catch(console.error);

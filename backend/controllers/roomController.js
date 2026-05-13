const { db, admin } = require('../config/firebaseAdmin');

async function getUserRooms(req, res, next) {
  try {
    if (!db) return res.status(500).json({ message: 'Firebase not initialized' });
    const { userId } = req.params;

    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return res.json({ rooms: [] });
    }
    const roomIds = userDoc.data().rooms || [];
    if (roomIds.length === 0) return res.json({ rooms: [] });

    // Firestore 'in' query is limited to 10 items. For simplicity, we handle it here.
    // If you have more than 10 rooms, you might need a different approach.
    const chunks = [];
    for (let i = 0; i < roomIds.length; i += 10) {
      chunks.push(roomIds.slice(i, i + 10));
    }

    const rooms = [];
    for (const chunk of chunks) {
      const snapshot = await db.collection('rooms').where(admin.firestore.FieldPath.documentId(), 'in', chunk).get();
      snapshot.forEach(doc => rooms.push({ id: doc.id, ...doc.data() }));
    }
    
    res.json({ rooms });
  } catch (err) {
    next(err);
  }
}

async function createRoom(req, res, next) {
  try {
    if (!db) return res.status(500).json({ message: 'Firebase not initialized' });
    const { userId, name } = req.body;

    if (!userId) return res.status(400).json({ message: 'userId required' });

    const roomId = Math.random().toString(36).substring(2, 8);
    
    await db.collection('rooms').doc(roomId).set({
      name: name || 'New Room',
      ownerId: userId,
      collaborators: [userId],
      createdAt: new Date()
    });

    await db.collection('users').doc(userId).set({
      rooms: admin.firestore.FieldValue.arrayUnion(roomId)
    }, { merge: true });

    res.status(201).json({ roomId, name });
  } catch (err) {
    next(err);
  }
}

async function joinRoom(req, res, next) {
  try {
    if (!db) return res.status(500).json({ message: 'Firebase not initialized' });
    const { userId, roomId } = req.body;

    if (!userId || !roomId) return res.status(400).json({ message: 'userId and roomId required' });

    const roomRef = db.collection('rooms').doc(roomId);
    const roomDoc = await roomRef.get();
    
    if (!roomDoc.exists) {
      return res.status(404).json({ message: 'Room not found' });
    }

    await roomRef.update({
      collaborators: admin.firestore.FieldValue.arrayUnion(userId)
    });

    await db.collection('users').doc(userId).set({
      rooms: admin.firestore.FieldValue.arrayUnion(roomId)
    }, { merge: true });

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

async function deleteRoom(req, res, next) {
  try {
    const { roomId } = req.params;
    const { userId } = req.query; // Should verify if user is owner

    await db.collection('rooms').doc(roomId).delete();
    
    if (userId) {
      await db.collection('users').doc(userId).update({
        rooms: admin.firestore.FieldValue.arrayRemove(roomId)
      });
    }

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { getUserRooms, createRoom, joinRoom, deleteRoom };

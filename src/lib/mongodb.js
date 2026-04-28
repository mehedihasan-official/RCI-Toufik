import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'rciDB';

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

function createMongoConnectionError(error) {
  const isAtlasNetworkError =
    error?.name === 'MongooseServerSelectionError' ||
    error?.name === 'MongoServerSelectionError' ||
    /whitelist|IP|ENOTFOUND|ECONNREFUSED|server selection/i.test(
      error?.message || ''
    );

  if (!isAtlasNetworkError) {
    return error;
  }

  const wrappedError = new Error(
    'MongoDB connection failed. In production on Vercel, this usually means your MongoDB Atlas network access list does not allow Vercel to reach the cluster. Add 0.0.0.0/0 to Atlas Network Access for testing, or use a fixed egress/private connection for production.'
  );
  wrappedError.name = 'MongoConnectionError';
  wrappedError.cause = error;

  return wrappedError;
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: MONGODB_DB_NAME,
      serverSelectionTimeoutMS: 10000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw createMongoConnectionError(e);
  }

  return cached.conn;
}

export default connectDB;

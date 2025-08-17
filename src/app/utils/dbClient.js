const { MongoClient, ServerApiVersion, Db } = require("mongodb");

const mongoClient = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

/**
 * @returns {Promise<Db>} MongoDBのDbインスタンス
 */
export async function getConnectedDB() {
  if (db) {
    return db;
  }

  try {
    await mongoClient.connect();
    db = mongoClient.db("twitch-search-app-db");
    console.log("Successfully connected to MongoDB Atlas!");

    return db;
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}

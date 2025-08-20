import { getConnectedDB } from "../../../utils/dbClient";

const removeTokenCache = async () => {
  const db = await getConnectedDB();
  const collection = db.collection("clenetAccessToken");
  await collection.deleteMany({});
};

export default removeTokenCache;

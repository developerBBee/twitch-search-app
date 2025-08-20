import { getConnectedDB } from "../../../utils/dbClient";
import getNewToken from "../../twitch/getNewToken";

const getToken = async () => {
  // DBからトークンを取得
  const db = await getConnectedDB();
  const collection = db.collection("clenetAccessToken");
  const cachedToken = await collection.findOne({});

  // 期限内ならそれを返す
  const now = Date.now();
  if (cachedToken && now < cachedToken.expires_at) {
    return cachedToken;
  }

  // 新しいトークンを取得
  const tokenData = await getNewToken();
  console.log("Token updated:", tokenData);

  // 1分前に期限切れとする
  tokenData.expires_at = now + (tokenData.expires_in - 60) * 1000;
  console.log(
    "Token expires at:",
    new Date(tokenData.expires_at).toISOString()
  );
  if (cachedToken) {
    await collection.replaceOne({ _id: cachedToken._id }, tokenData);
  } else {
    await collection.insertOne(tokenData);
  }

  return tokenData;
};

export default getToken;

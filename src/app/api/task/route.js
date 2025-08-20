import { getConnectedDB } from "../../utils/dbClient";
import { NextResponse } from "next/server";
import getToken from "../mongo/token/getToken";

export async function GET(request) {
  try {
    // Twitchから取得する（最大10回）
    const newTopGames = [];
    let cursor = null;
    for (let i = 0; i < 10; i++) {
      const topGamesResponse = await callTopGamesApi(cursor);
      const addData = topGamesResponse.data.filter(
        (data) => !newTopGames.find((game) => game.id === data.id)
      );
      newTopGames.push(...addData);
      cursor = topGamesResponse.pagination.cursor;
      if (!cursor) break;
    }

    // DBから全件取得する
    const db = await getConnectedDB();
    const collection = db.collection("topGames");
    const oldTopGames = await collection.find({}).toArray();

    // idが同じものは更新、新規のものは挿入
    const insertGames = [];
    for (const newGame of newTopGames) {
      // 同じidのゲームがDBに存在するか確認
      const oldSameGame = oldTopGames.find((g) => g.id === newGame.id);

      if (oldSameGame) {
        // 存在する場合、_id, id以外の情報を比較して、異なる場合は新しい情報で更新する
        const updateGame = { _id: oldSameGame._id, ...newGame };
        if (JSON.stringify(updateGame) !== JSON.stringify(oldSameGame)) {
          console.log("Update", updateGame);
          await collection.replaceOne({ _id: updateGame._id }, updateGame);
        }
      } else {
        // 新規のゲームは挿入リストに追加
        insertGames.push(newGame);
      }
    }

    // 保存する
    console.log("Insert", insertGames);
    if (insertGames.length > 0) await collection.insertMany(insertGames);

    return NextResponse.json({ result: "success" });
  } catch (error) {
    console.error("Error updating top games:", error);
    return NextResponse.json({ result: "error", message: error.message });
  }
}

const callTopGamesApi = async (cursor) => {
  const token = await getToken();
  console.log("Token received:", token);

  const query = cursor ? `?after=${cursor}` : "";
  const response = await fetch(
    `https://api.twitch.tv/helix/games/top${query}`,
    {
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

import { getConnectedDB } from "@/app/utils/dbClient";

export async function GET() {
  const db = await getConnectedDB();
  const collection = db.collection("games");
  const games = await collection.find({}).toArray();
  return NextResponse.json(games);
}

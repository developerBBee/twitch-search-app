import { getConnectedDB } from "../../utils/dbClient";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("Request data:", data);
    const db = await getConnectedDB();
    const collection = db.collection("users");
    const result = await collection.insertOne(data);

    console.log("Insert result:", result);
    return NextResponse.json({ data: result });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
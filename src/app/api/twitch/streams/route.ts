import { NextRequest, NextResponse } from 'next/server';
import getToken from "../getToken";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const token = await getToken();
    console.log("Token received:", token);

    const { searchParams } = new URL(request.url);

    const response = await fetch(
      `https://api.twitch.tv/helix/streams?${searchParams}`,
      {
        headers: {
          "Client-ID": process.env.CLIENT_ID,
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    );

    console.log("Response received:", response);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch streams data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Response json:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching streams data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

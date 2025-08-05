import getToken from "../getToken";

export async function GET(request) {
  try {
    const token = await getToken();
    console.log("Token received:", token);

    const { searchParams } = new URL(request.url);

    const response = await fetch(
      `https://api.twitch.tv/helix/schedule?${searchParams}`,
      {
        headers: {
          "Client-ID": process.env.CLIENT_ID,
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    );

    console.log("Response received:", response);
    if (!response.ok) {
      return new Response("Failed to fetch schedule data", {
        status: response.status,
      });
    }

    const data = await response.json();
    console.log("Response json:", data);
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching schedule data:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

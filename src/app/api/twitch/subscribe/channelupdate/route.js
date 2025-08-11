import getToken from "../../getToken";

export async function POST(request) {
  try {
    const reqBody = await request.json();

    const body = {
      type: "channel.update",
      version: "2",
      condition: { broadcaster_user_id: reqBody.broadcaster_user_id },
      transport: {
        method: "webhook",
        callback: process.env.TWITCH_CHANNEL_UPDATE_CALLBACK,
        secret: process.env.TWITCH_WEBHOOK_SECRET,
      },
    };
    console.log("Subscription request body:", body);

    const token = await getToken();
    console.log("Token received:", token);

    const response = await fetch(
      `https://api.twitch.tv/helix/eventsub/subscriptions`,
      {
        headers: {
          "Client-ID": process.env.CLIENT_ID,
          Authorization: `Bearer ${token.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    console.log("Response received:", response);
    if (!response.ok) {
      return new Response("Failed to subscribe channel update", {
        status: response.status,
      });
    }

    const data = await response.json();
    console.log("Response json:", data);
    return Response.json(data);
  } catch (error) {
    console.error("Error subscribing channel update:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

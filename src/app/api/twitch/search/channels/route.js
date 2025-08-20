import getToken from "../../../mongo/token/getToken";
import handleResponse from "../../handleResponse";

export async function GET(request) {
  try {
    const token = await getToken();
    console.log("Token received:", token);

    const { searchParams } = new URL(request.url);

    const response = await fetch(
      `https://api.twitch.tv/helix/search/channels?${searchParams}`,
      {
        headers: {
          "Client-ID": process.env.CLIENT_ID,
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    );

    console.log("channels API response received:", response);
    return await handleResponse(response);
  } catch (error) {
    return await handleError("Error fetching channels data:", error);
  }
}

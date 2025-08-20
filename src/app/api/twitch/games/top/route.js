import handleError from "../../handleError";
import getToken from "../../../mongo/token/getToken";
import handleResponse from "../../handleResponse";

export async function GET() {
  try {
    const token = await getToken();
    console.log("Token received:", token);

    const response = await fetch(`https://api.twitch.tv/helix/games/top`, {
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${token.access_token}`,
      },
    });

    console.log("games top API response received:", response);
    return await handleResponse(response);
  } catch (error) {
    return await handleError("Error fetching games data:", error);
  }
}

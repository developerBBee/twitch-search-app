import { NextResponse } from "next/server";
import removeTokenCache from "../mongo/token/removeTokenCache";

/**
 * Handles the response from a fetch request.
 * @param {Response} response - The response object from the fetch request.
 * @returns {Promise<NextResponse>} - A promise that resolves to a NextResponse object.
 */
const handleResponse = async (response) => {
  if (response.ok) {
    const data = await response.json();
    console.log("Response json:", data);
    return NextResponse.json(data);
  } else {
    if (response.status === 401) {
      await removeTokenCache();
    }
    const error = { status: response.status };
    return NextResponse.json(error);
  }
};

export default handleResponse;

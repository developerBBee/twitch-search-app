import { NextResponse } from "next/server";

const handleError = async (logMessage, error) => {
  console.error(logMessage, error);
  return new NextResponse("Internal Server Error", { status: 500 });
};

export default handleError;

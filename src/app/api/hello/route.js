export async function GET() {
  return Response.json({
    message: "Hello from Next.js API!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
}

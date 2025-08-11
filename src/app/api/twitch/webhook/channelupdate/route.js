import crypto from "crypto";

// Notification request headers
const TWITCH_MESSAGE_ID = "Twitch-Eventsub-Message-Id".toLowerCase();
const TWITCH_MESSAGE_TIMESTAMP =
  "Twitch-Eventsub-Message-Timestamp".toLowerCase();
const TWITCH_MESSAGE_SIGNATURE =
  "Twitch-Eventsub-Message-Signature".toLowerCase();
const MESSAGE_TYPE = "Twitch-Eventsub-Message-Type".toLowerCase();

// Notification message types
const MESSAGE_TYPE_VERIFICATION = 'webhook_callback_verification';
const MESSAGE_TYPE_NOTIFICATION = 'notification';
const MESSAGE_TYPE_REVOCATION = 'revocation';

// Prepend this string to the HMAC that's created from the message
const HMAC_PREFIX = "sha256=";

export async function POST(req) {
  console.warn("\n\n\nReceived webhook message:", req);
  const body = await req.text();
  console.log("Request body:", body);

  const secret = getSecret();
  console.log("Secret:", secret);
  const message = await getHmacMessage(req, body);
  console.log("Message:", message);
  const hmac = HMAC_PREFIX + getHmac(secret, message);
  console.log("HMAC:", hmac);
  const signature = req.headers.get(TWITCH_MESSAGE_SIGNATURE);
  console.log(TWITCH_MESSAGE_SIGNATURE, signature);

  if (true === verifyMessage(hmac, signature)) {
    console.log("signatures match");

    const notification = JSON.parse(body);

    if (MESSAGE_TYPE_NOTIFICATION === req.headers.get(MESSAGE_TYPE)) {
      // TODO: Do something with the event's data.

      console.log(`Event type: ${notification.subscription.type}`);
      console.log(JSON.stringify(notification.event, null, 4));

      return new Response(null, { status: 204 });
    } else if (MESSAGE_TYPE_VERIFICATION === req.headers.get(MESSAGE_TYPE)) {
      return new Response(notification.challenge, {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    } else if (MESSAGE_TYPE_REVOCATION === req.headers.get(MESSAGE_TYPE)) {
      console.log(`${notification.subscription.type} notifications revoked!`);
      console.log(`reason: ${notification.subscription.status}`);
      console.log(
        `condition: ${JSON.stringify(
          notification.subscription.condition,
          null,
          4
        )}`
      );
      return new Response(null, { status: 204 });
    } else {
      console.log(`Unknown message type: ${req.headers.get(MESSAGE_TYPE)}`);
      return new Response(null, { status: 204 });
    }
  } else {
    console.log("403");
    return new Response(null, { status: 403 });
  }
}

function getSecret() {
  // TODO: Get your secret from secure storage. This is the secret you passed
  // when you subscribed to the event.
  return process.env.TWITCH_WEBHOOK_SECRET;
}

// Build the message used to get the HMAC.
function getHmacMessage(request, body) {
  return (
    request.headers.get(TWITCH_MESSAGE_ID) +
    request.headers.get(TWITCH_MESSAGE_TIMESTAMP) +
    body
  );
}

// Get the HMAC.
function getHmac(secret, message) {
  return crypto.createHmac("sha256", secret).update(message).digest("hex");
}

// Verify whether your signature matches Twitch's signature.
function verifyMessage(hmac, verifySignature) {
  return crypto.timingSafeEqual(
    Buffer.from(hmac),
    Buffer.from(verifySignature)
  );
}

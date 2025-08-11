let cachedTokenData = null;
let expiresAt = 0;

const getToken = async () => {
  // 期限内のトークンがあればそれを返す
  const now = Date.now();
  if (cachedTokenData && now < expiresAt) {
    return cachedTokenData;
  }

  const tokenData = await refreshToken();
  console.log("Token updated:", tokenData);

  cachedTokenData = tokenData;
  // 1分前に期限切れとする
  expiresAt = now + (tokenData.expires_in - 60) * 1000;
  return tokenData;
};

const refreshToken = async () => {
  const request = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "client_credentials",
  };
  const response = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch token");
  }
  const data = await response.json();
  return data;
};

export default getToken;

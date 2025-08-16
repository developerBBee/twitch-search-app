import React from "react";
import { useSession, signIn } from "next-auth/react";
import { Box, Typography } from "@mui/material";
import GoogleButton from "./GoogleButton";

/**
 * Google Login Component
 * https://next-auth.js.org/providers/google
 * next-authの場合、GoogleAuthPlatformのOAuth設定で、
 * 承認済みのリダイレクトURIを以下のように設定することで機能する。
 * For production: https://{DOMAIN}/api/auth/callback/google
 * For development: http://localhost:3000/api/auth/callback/google
 */
const Login = () => {
  const { data, status } = useSession();

  if (status === "loading") {
    return (
      <>
        <Typography variant="body1">Loading...</Typography>
      </>
    );
  }

  if (status !== "authenticated") {
    return (
      <Box>
        <Typography variant="body1">あなたはログインしていません</Typography>
        <GoogleButton onClick={() => signIn("google", {}, { prompt: "login" })}>
          Googleでログイン
        </GoogleButton>
      </Box>
    );
  }

  return null;
}

export default Login;

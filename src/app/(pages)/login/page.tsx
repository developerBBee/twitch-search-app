"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Login from "../components/Login";
import Logout from "../components/Logout";

const LoginPage: React.FC = () => {
  const { data, status } = useSession();
  return (
    <Box>
      {status === "authenticated" ? (
        <Box>
          <Typography variant="body1">期限:{data?.expires}</Typography>
          <Typography variant="body1">ユーザー名:{data?.user?.name}</Typography>
          <img
            src={data?.user?.image ?? ""}
            alt=""
            style={{ borderRadius: "50px" }}
          />
          <Logout />
        </Box>
      ) : (
        <Login />
      )}
    </Box>
  );
};

export default LoginPage;

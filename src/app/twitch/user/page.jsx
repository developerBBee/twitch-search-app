"use client";

import { Box, Button } from "@mui/material";
import React from "react";

const UserPage = () => {

  const handleClick = async (e) => {
    e.preventDefault();
    const query = new URLSearchParams({
      login: "breesknees",
    });

    try {
      const result = await fetch(`/api/twitch/user?${query}`);
      const resultData = await result.json();
      console.log("User Data:", resultData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("ユーザー情報の取得に失敗しました。");
    }
  };

  return (
    <Box>
      <h1>ユーザー情報取得</h1>
      <Button onClick={handleClick}>ユーザー情報を取得</Button>
    </Box>
  );
};

export default UserPage;

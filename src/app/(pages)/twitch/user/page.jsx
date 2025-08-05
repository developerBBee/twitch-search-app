"use client";

import { fetchSchedule, fetchUser } from "@/app/utils/apiUtils";
import { Box, Button, TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import Segments from "./segments";

const UserPage = () => {
  const [result, setResult] = useState("");
  const [segments, setSegments] = useState([]);

  const onFetchUserClick = async (e) => {
    e.preventDefault();
    const query = new URLSearchParams({
      login: "breesknees",
    });

    fetchUser(query, setResult, (error) => {
      alert(`ユーザー情報の取得に失敗しました。${error}`);
    });
  };

  const onFetchScheduleClick = async (e) => {
    e.preventDefault();
    const query = new URLSearchParams({
      broadcaster_id: "229044481",
    });

    fetchSchedule(query, setSegments, (error) => {
      alert(`スケジュール情報の取得に失敗しました。${error}`);
    });
  };

  return (
    <Box>
      <h1>APIテスト</h1>
      <Button onClick={onFetchUserClick}>ユーザー情報を取得</Button>
      <Button onClick={onFetchScheduleClick}>スケジュール情報を取得</Button>
      <Box sx={{ marginTop: 2 }}>
        <TextareaAutosize
          value={result}
          minRows={10}
          style={{ width: "100%" }}
        />
      </Box>

      <Box sx={{ marginTop: 2 }} />
      <Segments segments={segments} />
    </Box>
  );
};

export default UserPage;

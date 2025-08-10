"use client";

import { fetchSchedule, fetchUser, fetchVideos } from "../../../utils/apiUtils";
import { Box, Button, TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import Segments from "./segments";
import Videos from "./videos";

const UserPage = () => {
  const [result, setResult] = useState("");
  const [segments, setSegments] = useState([]);
  const [videos, setVideos] = useState([]);

  const onFetchUserClick = async (e) => {
    e.preventDefault();
    const query = new URLSearchParams({
      login: "rtainjapan",
    });

    fetchUser(query, setResult, (error) => {
      alert(`ユーザー情報の取得に失敗しました。${error}`);
    });
  };

  const onFetchScheduleClick = async (e) => {
    e.preventDefault();
    const query = new URLSearchParams({
      broadcaster_id: "134850221",
    });

    fetchSchedule(query, setSegments, (error) => {
      alert(`スケジュール情報の取得に失敗しました。${error}`);
    });
  };

  const onFetchVideosClick = async (e) => {
    e.preventDefault();
    const query = new URLSearchParams({
      user_id: "134850221",
    });

    fetchVideos(query, setVideos, (error) => {
      alert(`動画情報の取得に失敗しました。${error}`);
    });
  };

  return (
    <Box>
      <h1>APIテスト</h1>
      <Button onClick={onFetchUserClick}>ユーザー情報を取得</Button>
      <Button onClick={onFetchScheduleClick}>スケジュール情報を取得</Button>
      <Button onClick={onFetchVideosClick}>動画情報を取得</Button>
      <Box sx={{ marginTop: 2 }}>
        <TextareaAutosize
          value={result}
          minRows={10}
          style={{ width: "100%" }}
        />
      </Box>

      <Box sx={{ marginTop: 2 }} />
      <Segments segments={segments} />
      <Videos videos={videos} />
    </Box>
  );
};

export default UserPage;

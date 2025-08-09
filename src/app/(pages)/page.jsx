"use client";

import { useEffect, useState } from "react";
import StreamList from "./components/StreamList";
import { fetchStreams } from "../utils/apiUtils";

export default function Home() {
  const [streamList, setStreamList] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams({});
    fetchStreams(query, setStreamList, (error) => {
      alert(`配信情報の取得に失敗しました。${error}`);
    });
  }, []);

  return (
    <StreamList
      streamList={streamList}
      sx={{ maxWidth: "1200px", margin: "0 auto", padding: 3 }}
    />
  );
}

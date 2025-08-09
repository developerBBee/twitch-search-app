import { dummyStreams } from "../utils/dummyData";
import StreamList from "./components/StreamList";

export default function Home() {
  return (
    <StreamList
      streamList={dummyStreams}
      sx={{ maxWidth: "1200px", margin: "0 auto", padding: 3 }}
    />
  );
}

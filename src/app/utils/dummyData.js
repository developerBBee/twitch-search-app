// ダミーデータ
export const dummyStreams = Array.from({ length: 24 }, (_, index) => ({
  id: index + 1,
  title: `配信タイトル ${index + 1}`,
  streamer: `配信者${index + 1}`,
  game: `ゲーム${(index % 5) + 1}`,
  viewers: 10000 + index,
  thumbnail: `https://picsum.photos/320/180?random=${index}`,
  tags: ["タグ1", "タグ2", "タグ3"].slice(0, Math.floor(10000 + index) + 1),
}));

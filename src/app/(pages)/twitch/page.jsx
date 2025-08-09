"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  Box as MuiBox,
  InputAdornment,
  Chip,
  Avatar,
} from "@mui/material";
import { Box } from "@mui/system";
import { Search, Person, Visibility, ThumbUp } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { dummyStreams } from "@/app/utils/dummyData";

const TwitchApiMenuPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchBarSticky, setIsSearchBarSticky] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // スクロール監視
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSearchBarSticky(scrollPosition > 120);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ページング処理
  const totalPages = Math.ceil(dummyStreams.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStreams = dummyStreams.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearch = () => {
    console.log("検索:", searchQuery);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box>
      {/* トップバー */}
      <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
        <Toolbar>
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
            TwitchSearch
          </Typography>
        </Toolbar>
      </AppBar>

      {/* サーチバー（スクロール時にドッキング） */}
      <MuiBox
        sx={{
          position: isSearchBarSticky ? "fixed" : "static",
          top: isSearchBarSticky ? 0 : "auto",
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: "background.paper",
          boxShadow: isSearchBarSticky ? 2 : 0,
          padding: 2,
          transition: "all 0.3s ease-in-out",
        }}
      >
        <MuiBox
          sx={{
            display: "flex",
            gap: 2,
            maxWidth: "1200px",
            margin: "0 auto",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="配信者名やゲーム名で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{ minWidth: "120px", height: "56px" }}
          >
            検索
          </Button>
        </MuiBox>
      </MuiBox>

      {/* スティッキーサーチバー用のスペーサー */}
      {isSearchBarSticky && <MuiBox sx={{ height: "88px" }} />}

      {/* フィードのページングリスト */}
      <MuiBox sx={{ maxWidth: "1200px", margin: "0 auto", padding: 3 }}>
        <Grid container spacing={3}>
          {currentStreams.map((stream) => (
            <Grid item xs={12} sm={6} md={4} key={stream.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                    cursor: "pointer",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={stream.thumbnail}
                  alt={stream.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: "bold",
                      marginBottom: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {stream.title}
                  </Typography>

                  <MuiBox
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Avatar sx={{ width: 24, height: 24 }}>
                      <Person fontSize="small" />
                    </Avatar>
                    <Typography variant="body2" color="text.secondary">
                      {stream.streamer}
                    </Typography>
                  </MuiBox>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginBottom: 1 }}
                  >
                    {stream.game}
                  </Typography>

                  <MuiBox
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <Visibility fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {stream.viewers.toLocaleString()} 視聴者
                    </Typography>
                  </MuiBox>

                  <MuiBox sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {stream.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "0.75rem" }}
                      />
                    ))}
                  </MuiBox>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* ページネーション */}
        <MuiBox
          sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </MuiBox>
      </MuiBox>
    </Box>
  );
};

export default TwitchApiMenuPage;

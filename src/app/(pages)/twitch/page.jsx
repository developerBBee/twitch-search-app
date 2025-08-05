import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import { Person } from "@mui/icons-material";

const TwitchApiMenuPage = () => {
  return (
    <Box>
      <h1>Twitch API メニュー</h1>

      <List>
        <ListItemButton sx={{ width: "fit-content" }} href="/twitch/user">
          <ListItemIcon>
            <Person sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="ユーザー情報取得" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default TwitchApiMenuPage;

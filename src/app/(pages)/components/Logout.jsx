import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Box, Button } from "@mui/material";

const Logout = () => {
  const { data, status } = useSession();
  if (status === "authenticated") {
    return (
      <Box>
        <Button onClick={() => signOut()}>ログアウト</Button>
      </Box>
    );
  }

  return null;
};

export default Logout;

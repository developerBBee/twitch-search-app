import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

interface GoogleButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ onClick, children }) => {
  return (
    <Box>
      <Image
        src="/images/web_light_rd_SI.svg"
        alt="Sign in with Google"
        width={175}
        height={40}
        style={{ cursor: "pointer" }}
        onClick={onClick}
      />
    </Box>
  );
};

export default GoogleButton;

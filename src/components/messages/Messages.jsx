import { Box, Typography } from "@mui/material";
import "./Messages.css";

export default function Messages() {
  return (
    <Box
      sx={{
        height: "78%",
        width: "100%",
        overflowY: "scroll",
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: "10px 15px",
          margin: "0px 0",
        }}
      >
        <Box
          sx={{
            width: "60%",
            background: "white",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <Typography fontSize={14}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
            nam!
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          padding: "10px 15px",
          margin: "0px 0",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Box
          className="msg"
          sx={{
            width: "60%",
            // background: "rgb(18, 18, 58)",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <Typography fontSize={14} color={"white"}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
            nam!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

import { Box, Button, InputBase } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/Send";
import "./MessageInput.css";

export default function MessageInput() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "11%",
        padding: "5px 8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
        borderRadius: "10px",
      }}
    >
      <Box sx={{ width: "100%", padding: "15px 0px" }}>
        <InputBase
          fullWidth
          size="small"
          placeholder="message..."
          sx={{
            padding: "5px 10px",
            border: "1px solid silver",
            outline: "none",
            borderRadius: "5px",
          }}
        />
      </Box>
      <Button
        className="msgInputBtn"
        sx={{
          height: "70%",
          marginLeft: "5px",
          color: "white",
        }}
      >
        <SendRoundedIcon style={{ fill: "white", fontSize: "20px" }} />
      </Button>
    </Box>
  );
}

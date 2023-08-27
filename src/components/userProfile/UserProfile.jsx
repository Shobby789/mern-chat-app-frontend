import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import "./UserProfile.css";

export default function UserProfile() {
  return (
    <Box className="user-profile">
      <Box
        sx={{
          padding: "3px 30px",
          borderRadius: "15px",
          background: "white",
        }}
      >
        <ListItem sx={{ padding: "0" }}>
          <ListItemAvatar sx={{ padding: "0" }}>
            <Avatar sx={{ padding: "0" }}>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="xyz"
            secondary="aaaa@gmail.com"
            sx={{ padding: "0" }}
          />
        </ListItem>
      </Box>
    </Box>
  );
}

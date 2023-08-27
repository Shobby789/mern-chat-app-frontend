import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ChatList() {
  const loggedInUser = JSON.parse(localStorage.getItem("userDetails"));
  const [conversations, setConversations] = useState([]);
  const fetchConversations = async () => {
    try {
      const res = await fetch(
        `http://localhost:1000/api/conversation/${loggedInUser?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resConv = await res.json();
      console.log("logged in user conversations: >> ", resConv);
      setConversations(resConv);
    } catch (error) {
      console.log("Error while fetching conversations >>> ", error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);
  const users = [
    {
      id: 1,
      fullName: "Shoaib",
      email: "shoaib@gmail.com",
    },
    {
      id: 2,
      fullName: "Haseeb",
      email: "haseeb@gmail.com",
    },
    {
      id: 3,
      fullName: "Moazam",
      email: "moazam@gmail.com",
    },
    {
      id: 4,
      fullName: "Tanveer",
      email: "tanveer@gmail.com",
    },
  ];
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "100%", height: "100%", padding: "0 30px" }}>
      <Box
        sx={{
          width: "100%",
          height: "15%",
          borderBottom: "1px solid whitesmoke",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <ListItem sx={{ padding: "0 20px", color: "white" }}>
          <ListItemAvatar sx={{ padding: "0" }}>
            <Avatar
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
              sx={{ padding: "0" }}
            ></Avatar>
          </ListItemAvatar>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="body2" style={{ color: "#FFFFFF" }}>
                {loggedInUser?.fullName}
              </Typography>
            }
            secondary={
              <Typography variant="caption" style={{ color: "silver" }}>
                My Account
              </Typography>
            }
          />
        </ListItem>
      </Box>
      <Typography variant="h6" marginLeft={6} marginBottom={1} color={"white"}>
        Messages
      </Typography>
      <Box sx={{ width: "100%", height: "65%", overflowY: "scroll" }}>
        {conversations?.map(({ conversationId, user }) => {
          return (
            <ListItem
              key={conversationId}
              id={conversationId}
              sx={{ cursor: "pointer" }}
            >
              <ListItemAvatar>
                <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80"></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body2" style={{ color: "#FFFFFF" }}>
                    {user?.fullName}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" style={{ color: "silver" }}>
                    {user?.email}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "10%",
          display: "flex",
          alignItems: "center",
          // justifyContent: "center",
          padding: "5px 15px",
        }}
      >
        <Button
          sx={{
            height: "70%",
            marginLeft: "5px",
            background: "white",
            color: "black",
            fontWeight: "700",
            padding: "5px 15px",
            "&:hover": { background: "silver", transition: "0.3s" },
          }}
          size="small"
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

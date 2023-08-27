import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function List() {
  const [allUsers, setAllUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("userDetails"));

  const getAllUsers = async () => {
    try {
      const res = await fetch(`http://localhost:1000/api/users/${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const gettingUsers = await res.json();
      setAllUsers(gettingUsers);
    } catch (error) {
      console.log("error >> ", error);
    }
  };

  useEffect(() => {
    getAllUsers();
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
  return (
    <Box sx={{ height: "100%", padding: "0 30px" }}>
      <Box
        sx={{
          width: "100%",
          height: "15%",
          padding: "25px 35px 0",
          borderBottom: "1px solid whitesmoke",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: "20px", color: "white", fontWeight: "bold" }}
        >
          Users
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "85%",
          overflowY: "scroll",
          padding: "15px 20px 0",
        }}
      >
        {allUsers?.map(({ user }) => {
          return (
            <ListItem
              id={user.recieverId}
              key={user.recieverId}
              sx={{
                cursor: "pointer",
                borderRadius: "10px",
                "&:hover": {
                  background: "whitesmoke",
                  transition: "0.3s",
                  borderRadius: "10px",
                },
              }}
              onClick={() => alert("You clicked >> " + user.fullName)}
            >
              <ListItemAvatar>
                <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80"></Avatar>
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    variant="body2"
                    style={{
                      color: "#FFFFFF",
                    }}
                  >
                    {user.fullName}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" style={{ color: "silver" }}>
                    {user.email}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </Box>
    </Box>
  );
}

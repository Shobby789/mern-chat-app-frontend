import "./Dashboard.css";
import SendRoundedIcon from "@mui/icons-material/Send";
import {
  Avatar,
  Box,
  Button,
  InputBase,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export default function Dashboard() {
  const navigate = useNavigate();
  const messageRef = useRef();
  const loggedInUser = JSON.parse(localStorage.getItem("userDetails"));
  const [conversations, setConversations] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    setSocket(io("http://localhost:8080"));
  }, []);

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages?.messages]);

  useEffect(() => {
    socket?.emit("addUser", loggedInUser?.id);
    socket?.on("getUsers", (users) => {});
    socket?.on("getMessage", (data) => {
      // console.log("getMessage data >>> ", data);
      setMessages((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { user: data.user, message: data.message },
        ],
      }));
    });
  }, [socket, message]);

  const getAllUsers = async () => {
    try {
      const res = await fetch(
        `http://localhost:1000/api/users/${loggedInUser.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const gettingUsers = await res.json();
      setAllUsers(gettingUsers);
    } catch (error) {
      console.log("error >> ", error);
    }
  };

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
      // console.log("logged in user conversations: >> ", resConv);
      setConversations(resConv);
    } catch (error) {
      console.log("Error while fetching conversations >>> ", error);
    }
  };

  useEffect(() => {
    fetchConversations();
    getAllUsers();
  }, []);

  const sendMessage = async () => {
    // e.preventDefault();
    setMessage("");
    socket.emit("sendMessage", {
      message: message,
      conversationId: messages.conversationId,
      senderId: loggedInUser?.id,
      recieverId: messages.reciever?.recieverId,
    });
    const res = await fetch("http://localhost:1000/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        conversationId: messages.conversationId,
        senderId: loggedInUser.id,
        recieverId: messages.reciever?.recieverId,
      }),
    });
    const messageResponse = await res.json();
    console.log("Msg sent resp >>> ", messageResponse);
  };

  const fetchMessages = async (conversationId, reciever) => {
    const res = await fetch(
      `http://localhost:1000/api/message/${conversationId}?senderId=${loggedInUser?.id}&&recieverId=${reciever?.recieverId}`,
      {
        method: "GET",
        // ...(conversationId === "new" && {
        //   body: JSON.stringify({
        //     senderId: user?.id,
        //     recieverId: messages?.reciever?.recieverId,
        //   }),
        // }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const resData = await res.json();
    setMessages({ messages: resData, reciever, conversationId });
    // console.log("fetch chat messages api call >>>>> ", resData);
  };
  return (
    <Box className="dashboard">
      <Box className="box chats">
        {/* <ChatList /> */}
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
          <Typography
            variant="h6"
            marginLeft={6}
            marginBottom={1}
            color={"white"}
          >
            Messages
          </Typography>
          <Box sx={{ width: "100%", height: "65%", overflowY: "scroll" }}>
            {conversations?.map(({ conversationId, user }) => {
              return (
                <ListItem
                  key={conversationId}
                  id={conversationId}
                  sx={{ cursor: "pointer" }}
                  onClick={() => fetchMessages(conversationId, user)}
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
      </Box>
      <Box className="msgBox">
        {/* <UserProfile /> */}
        {/* User Profile Start */}
        {messages?.reciever ? (
          <>
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  padding: "3px 30px",
                  borderRadius: "10px",
                  background: "white",
                }}
              >
                <ListItem sx={{ padding: "0" }}>
                  <ListItemAvatar>
                    <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80"></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${messages?.reciever.fullName}`}
                    secondary={`${messages?.reciever.email}`}
                    sx={{ padding: "0" }}
                  />
                </ListItem>
              </Box>
            </Box>
          </>
        ) : (
          <></>
        )}

        {/* User Profile End */}
        {/* Messages Start */}
        <Box
          sx={{
            height: "78%",
            width: "100%",
            overflowY: "scroll",
          }}
        >
          {messages?.messages?.length > 0 ? (
            <>
              {messages?.messages?.map(({ message, user: { id } = {} }) => {
                if (id === loggedInUser.id) {
                  // My msgs
                  return (
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
                        ref={messageRef}
                        sx={{
                          width: "60%",
                          background: `linear-gradient(rgb(52, 3, 52), rgb(27, 2, 27))`,
                          padding: "10px 15px",
                          borderRadius: "10px",
                        }}
                      >
                        <Typography fontSize={14} color={"white"}>
                          {message}
                        </Typography>
                      </Box>
                    </Box>
                  );
                } else {
                  // reciever msgs
                  return (
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
                          padding: "10px 15px",
                          borderRadius: "10px",
                        }}
                      >
                        <Typography fontSize={14}>{message}</Typography>
                      </Box>
                    </Box>
                  );
                }
              })}
            </>
          ) : (
            <></>
          )}
        </Box>
        {/* Messages End */}
        {/* MessagesInput Start */}
        {/* <MessageInput /> */}
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
              onChange={handleChange}
              sx={{
                padding: "5px 10px",
                border: "1px solid silver",
                outline: "none",
                borderRadius: "5px",
              }}
            />
          </Box>
          <Button
            sx={{
              height: "70%",
              marginLeft: "5px",
              color: "white",
              background: `linear-gradient(rgb(52, 3, 52), rgb(27, 2, 27))`,
            }}
            onClick={() => sendMessage()}
          >
            <SendRoundedIcon style={{ fill: "white", fontSize: "20px" }} />
          </Button>
        </Box>
        {/* MessagesInput Start */}
      </Box>
      <Box className="box users">
        {/* All Users List Start */}
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
            {allUsers?.map(({ user, userId }) => {
              return (
                <ListItem
                  id={userId}
                  key={userId}
                  sx={{
                    cursor: "pointer",
                    borderRadius: "10px",
                    "&:hover": {
                      background: "whitesmoke",
                      transition: "0.3s",
                      borderRadius: "10px",
                    },
                  }}
                  onClick={() => fetchMessages("new", user)}
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
        {/* All Users End Start */}
      </Box>
    </Box>
  );
}

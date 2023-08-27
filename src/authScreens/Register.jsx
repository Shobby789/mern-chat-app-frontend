import { Box, Button, Container, InputBase, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!data.name && !data.email && !data.password) {
        alert("Fill in the fields");
      } else {
        console.log("data>>>>>", data);
        const res = await fetch("http://localhost:1000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        // const resData = await res.json();
        console.log("Login data: ", res);
        setData({ fullName: "", email: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      console.log("Register error >>> ", error);
      alert("Something wen wrong. Try again");
    }
  };
  return (
    <Container
      maxWidth="100%"
      className="login-container"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "40%",
          minWidth: "350px",
          height: "auto",
          padding: "50px 30px",
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          borderRadius: "20px",
          boxShadow: "0 0 20px purple",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={600}
          color={"white"}
          letterSpacing={2}
          mb={4}
        >
          Register
        </Typography>
        <Box sx={{ width: "70%" }} mb={3}>
          <InputBase
            id="outlined-basic"
            placeholder="Enter full name"
            type="text"
            fullWidth
            autoComplete="off"
            sx={{
              background: "#482c55",
              fontWeight: "600",
              borderRadius: "8px",
              outline: "none",
              input: { color: "silver", border: "none", outline: "none" },
              padding: "7px 15px",
            }}
            name="fullName"
            value={data.fullName}
            onChange={onChange}
          />
        </Box>
        <Box sx={{ width: "70%" }} mb={3}>
          <InputBase
            id="outlined-basic"
            placeholder="Enter email address"
            type="email"
            fullWidth
            autoComplete="off"
            sx={{
              background: "#482c55",
              fontWeight: "600",
              borderRadius: "8px",
              outline: "none",
              input: { color: "silver", border: "none", outline: "none" },
              padding: "7px 15px",
            }}
            name="email"
            value={data.email}
            onChange={onChange}
          />
        </Box>
        <Box sx={{ width: "70%" }} mb={3}>
          <InputBase
            id="outlined-basic"
            type="password"
            placeholder="Create a password"
            variant="outlined"
            fullWidth
            autoComplete="off"
            sx={{
              background: "#482c55",
              fontWeight: "600",
              borderRadius: "8px",
              outline: "none",
              input: { color: "silver", border: "none", outline: "none" },
              padding: "7px 15px",
            }}
            name="password"
            value={data.password}
            onChange={onChange}
          />
        </Box>
        <Box mb={3}>
          <Typography color={"white"} letterSpacing={1.5} fontSize={14}>
            Already have an account?
            <Link to={"/"} style={{ color: "white", marginLeft: "2px" }}>
              Login
            </Link>
          </Typography>
        </Box>
        <Box sx={{ width: "70%", textAlign: "center" }}>
          <Button
            letterSpacing={1.5}
            fullWidth
            sx={{
              padding: "6px 10px",
              background: "purple",
              color: "white",
              borderRadius: "8px",
              "&:hover": {
                background: "#482c55",
                transition: "0.3s",
              },
            }}
            onClick={onSubmit}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

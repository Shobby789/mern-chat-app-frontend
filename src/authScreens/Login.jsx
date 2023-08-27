import { Box, Button, Container, InputBase, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
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
      if (!data.email && !data.password) {
        alert("Pleade fill all the fields");
      } else {
        const res = await fetch("http://localhost:1000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const resData = await res.json();
        console.log("Login data: ", resData);
        localStorage.setItem("userDetails", JSON.stringify(resData.user));
        localStorage.setItem("token", JSON.stringify(resData.token));
        setData({ email: "", password: "" });
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Login server error: ", error);
      alert("Something went wrong. Try again");
    }
  };
  return (
    <Container
      maxWidth="100%"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="login-container"
    >
      <Box
        sx={{
          width: "40%",
          minWidth: "350px",
          height: "auto",
          padding: "50px 30px",
          border: "1px solid transparent",
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
          Welcome Back
        </Typography>
        <Box sx={{ width: "70%" }} mb={3}>
          <InputBase
            id="outlined-basic"
            placeholder="Enter email"
            type="email"
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
            name="email"
            value={data.email}
            onChange={onChange}
          />
        </Box>
        <Box sx={{ width: "70%" }} mb={3}>
          <InputBase
            id="outlined-basic"
            placeholder="Enter password"
            variant="outlined"
            type="password"
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
            {/* Don't have an account? */}
            <Link to={"/register"} style={{ color: "white" }}>
              Create Account
            </Link>
          </Typography>
        </Box>
        <Box
          sx={{
            width: "70%",
            textAlign: "center",
          }}
        >
          <Button
            letterSpacing={1.5}
            fullWidth
            sx={{
              padding: "6px 10px",
              background: "purple",
              borderRadius: "8px",
              color: "white",
              "&:hover": {
                background: "#482c55",
                transition: "0.3s",
              },
            }}
            onClick={onSubmit}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

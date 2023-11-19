import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/clientes");
        console.log(response.data); 
      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
      }
    };

    fetchData();
  }, []); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    if (!validatePassword(password)) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    try {
      const url = "http://localhost:3001/clientes";
      const data = {
        nombre: "valor",
        a_paterno: "valor",
        a_materno: "valor",
        email: email,
        password: password,
      };

      const response = await axios.post(url, data);

      console.log("Respuesta del servidor:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error en la solicitud POST:", error.response?.data || error.message);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6 && password[0] === password[0].toUpperCase();
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      style={{
        background: "white",
        position:"relative",
        right:"40px"
      }}

    >
      {/* <Box style={{ position: "relative", top: "-250px", left: "50px" }}>
        <img src={img} alt="" style={{ width: "90px", height: "80px" }} />

      </Box> */}
      <Box>

        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            bgcolor="rgba(128, 109, 112, 0.18)"
            borderRadius={8}
            height={350}
            width={300}
            p={4}
            position={"relative"}
            boxShadow="0 0 10px rgba(255, 230, 188, 0.5)"
          >
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  component="h2"
                  fontFamily={"sans-serif"}
                  gutterBottom
                  color={"black"}
                  position={"relative"}
                >
                  INICIAR SESIÓN
                </Typography>
                <Typography
                  variant="h6"
                  component="h2"
                  fontFamily={"unset"}
                  gutterBottom
                  color={"black"}
                  position={"relative"}
                >
                  Usuario
                </Typography>
                <TextField
                  value={email}
                  onChange={handleEmailChange}
                  error={emailError}
                  fullWidth
                  variant="outlined"
                  autoComplete="off"
                  className="custom-textfield"
                  InputProps={{
                    style: { color: "black" },
                  }}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#7F8C8D",
                        backgroundColor: "none",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#7F8C8D",
                      },
                    },
                    backgroundColor: "white",
                    borderColor: "none",
                  }}
                />
                {emailError && (
                  <Box
                    bgcolor="#ffcccc"
                    color="red"
                    borderRadius={10}
                    mt={1}
                    p={1}
                    textAlign="center"
                  >
                    Usuario no encontrado, inténtelo de nuevo.
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  component="h2"
                  fontFamily={"unset"}
                  gutterBottom
                  color={"black"}
                  position={"relative"}
                >
                  Contraseña
                </Typography>
                <TextField
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  error={passwordError}
                  fullWidth
                  autoComplete="off"
                  InputProps={{
                    style: { color: "black" },
                  }}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#7F8C8D",
                        backgroundColor: "none",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#7F8C8D",
                      },
                    },
                    backgroundColor: "white",
                    borderColor: "black",
                  }}
                />

                {passwordError && (
                  <Box
                    bgcolor="#ffcccc"
                    color="red"
                    borderRadius={4}
                    mt={1}
                    p={1}
                    textAlign="center"
                  >
                    La contraseña es incorrecta, inténtelo de nuevo.
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  size="small"
                  variant="contained"
                  fontFamily={"unset"}
                  position="relative"
                  sx={{
                    color: "#6B6B6B",
                    backgroundColor: "white",
                    borderColor: "white",
                    borderRadius: "100vh",
                    left: "0vh",
                    "&:hover": {
                      backgroundColor: "#ffe6bc",
                    },
                  }}
                >
                  Iniciar sesión
                </Button>
                <Link to="/">
                </Link>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;


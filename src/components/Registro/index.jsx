import React, { useState } from "react";
import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import img from "../img/Main_Logo-removebg-preview.png";
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    } else {
      setConfirmPasswordError(false);
    }

    if (!validatePassword(password)) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    if (!validatePhone(phone)) {
      setPhoneError(true);
      return;
    } else {
      setPhoneError(false);
    }

    navigate("/login");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6 && password[0] === password[0].toUpperCase();
  };

  const validatePhone = (phone) => {
    return phone.length >= 10;
  };

  

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      style={{
        background: "white",
      }}
    >
      <Box>
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            borderRadius={8}
            height={700}
            width={500}
            p={4}
            position={"relative"}
            boxShadow="#ffe6bc"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  component="h2"
                  fontFamily={"sans-serif"}
                  gutterBottom
                  color={"black"}
                  position={"relative"}
                >
                  REGISTRARSE
                </Typography>
                <Typography
                  variant="h6"
                  component="h2"
                  fontFamily={"unset"}
                  gutterBottom
                  color={"black"}
                  position={"relative"}
                >
                  Correo Electrónico
                </Typography>
                <TextField
                  value={email}
                  onChange={handleEmailChange}
                  error={emailError}
                  fullWidth
                  variant="outlined"
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
                    Correo electrónico no válido, inténtelo de nuevo.
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
                  Nombre de Usuario
                </Typography>
                <TextField
                  value={username}
                  onChange={handleUsernameChange}
                  fullWidth
                  variant="outlined"
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
                    borderColor: "none",
                  }}
                />
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
                  variant="outlined"
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
                <Typography
                  variant="h6"
                  component="h2"
                  fontFamily={"unset"}
                  gutterBottom
                  color={"black"}
                  position={"relative"}
                >
                  Confirmar Contraseña
                </Typography>
                <TextField
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={confirmPasswordError}
                  fullWidth
                  variant="outlined"
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
                {confirmPasswordError && (
                  <Box
                    bgcolor="#ffcccc"
                    color="red"
                    borderRadius={4}
                    mt={1}
                    p={1}
                    textAlign="center"
                  >
                    Las contraseñas no coinciden, inténtelo de nuevo.
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
                  Teléfono Celular
                </Typography>
                <TextField
                  value={phone}
                  onChange={handlePhoneChange}
                  error={phoneError}
                  fullWidth
                  variant="outlined"
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
                {phoneError && (
                  <Box
                    bgcolor="#ffcccc"
                    color="red"
                    borderRadius={4}
                    mt={1}
                    p={1}
                    textAlign="center"
                  >
                    Número de teléfono no válido, debe tener al menos 10 dígitos.
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
                  Registrarse
                </Button>
                <Link to="/inicio"  style={{ marginLeft: "100px" }}> ¿Ya tienes una cuenta? Iniciar sesión</Link>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default RegisterForm;

import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/images/TurnO.png'
import { APP_THEME_COLOR } from '../../assets/themes/themes';
import { fetchReadSignInData, REQUEST_TYPE } from '../../services/services';
import { host } from '../../services/API';

export const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    name: "",
    password: "",
    invalid: ""
  })
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let pass = true;
    const userDetails = {
      email: data.get('username'),
      password: data.get('password'),
    };

    if(userDetails.email.length <= 0){
      setErrors((prevState) => ({
        ...prevState,
        name: 'Email is required.'
      }))
      pass = false;
    }
    if(userDetails.password.length <= 0){
      setErrors((prevState) => ({
        ...prevState,
        password: 'Password is required.'
      }))
      pass = false;
    }

    if(pass){
      localStorage.setItem('userDetails', JSON.stringify(userDetails))
      const username_password = userDetails.email + ':' + userDetails.password
      fetchReadSignInData(`${host}/leads/users/signin`, REQUEST_TYPE.POST, username_password)
      .then((response) => {
          if(response?.id){
            let d = new Date();
            d = new Date(response.token_valid_till);
            d.setTime(d.getTime());
            document.cookie = `token=${response.token}; expires = ${d}; path=/`;
            document.cookie = `name=${(response.name)}; expires = ${d}; path=/`;
            document.cookie = `role=${(response?.role ? response.role : "admin")}; expires = ${d}; path=/`;
            if(response.role === 'ADMIN'){
              navigate("/admin/dashboard");
            }
            else{
              navigate("/home/check-eligibility");
            }
          }
          else{
            setErrors((prevState) => ({
              ...prevState,
              invalid: response.message
            }))
          }
      })
      
    }
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ width: 100, height: 100 }} src={Logo} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {errors.invalid && <div style={{marginTop: "10px"}} className="error">{errors.invalid}</div>}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="email"
              autoFocus
              onChange = {(e) => { if(e.target.value.length > 0 ){
                setErrors((prevState) => ({
                  ...prevState,
                  name: ''
                }))
              } }}
            />
            {errors.name && <span className="error">{errors.name}</span>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {(e) => { if(e.target.value.length > 0 ){
                setErrors((prevState) => ({
                  ...prevState,
                  password: ''
                }))
              } }}
            />
            {errors.password && <span className="error">{errors.password}</span>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: APP_THEME_COLOR }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        
      </Container>
  );
}

export default Login

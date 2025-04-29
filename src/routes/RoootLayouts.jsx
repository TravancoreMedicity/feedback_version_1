// @ts-nocheck
import React, { lazy, memo, Suspense, useCallback, useMemo, useState } from 'react'
import { Box, Grid, Typography } from '@mui/joy'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { succesNofity, errorNofity, sanitizeInput, warningNofity } from '../Constant/Constant';
import { axiosApi } from '../Axios/Axios';
import CopyRight from '../Components/CopyRight';
import { Skeleton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const LoginlogoHeader = lazy(() => import("../Components/LoginlogoHeader"))

const RoootLayouts = () => {
  const isSmallHeight = useMediaQuery('(max-height: 700px)');
  const navigate = useNavigate();

  // const userDetl = localStorage.getItem('app_auth');

  const [userInput, setUserInput] = useState({
    empid: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    empidError: '',
    passwordError: ''
  });
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    handleError(name, sanitizedValue);
    setUserInput((prev) => {
      return { ...prev, [name]: sanitizedValue }
    })
  }, []);

  const handleError = (name, value) => {
    if (name === "empid") {
      if (value === "") {
        setErrors((prev) => ({
          ...prev,
          empidError: "The field is empty"
        }))
      } else {
        setErrors((prev) => ({
          ...prev,
          empidError: ""
        }))
      }
    }
    if (name === "password") {
      if (value === "") {
        setErrors((prev) => ({
          ...prev,
          passwordError: "The password field is empty"
        }))
      } else {
        setErrors((prev) => ({
          ...prev,
          passwordError: ""
        }))
      }
    }
  };

  const postData = useMemo(() => {
    return {
      userName: userInput?.empid,
      passWord: userInput?.password,
      method: 1
    }
  }, [userInput])

  const handleloginform = useCallback(async () => {
    try {
      if (userInput?.empid === null || userInput?.empid === undefined || userInput?.empid === "") {
        setErrors((prev) => ({
          ...prev,
          empidError: "Employee Id Field is required"
        }))
      }

      if (userInput?.password === null || userInput?.password === undefined || userInput?.password === "") {
        setErrors((prev) => ({
          ...prev,
          passwordError: "Password Field is required"
        }));
        return;
      }

      const result = await axiosApi.post("/user/checkUserCres", postData, { withCredentials: true })
      const { message, success, userInfo } = result?.data;
      if (success === 0) {
        errorNofity(message); // database error
      } else if (success === 1) {
        warningNofity(message); // incorrected credientials
      } else if (success === 2) {
        succesNofity(message); // credential verified
        const { empdtl_slno, login_method_allowed, em_id } = JSON.parse(userInfo);
        const authData = {
          authNo: btoa(empdtl_slno),//btoa() encodes a string into Base64 format.
          authType: btoa(login_method_allowed),
          authId: btoa(em_id),
        };
        localStorage.setItem("app_auth", JSON.stringify(authData));
        setTimeout(() => {
          navigate("/Home/Dashboard", { replace: true });
        }, 2000);
      } else {
        errorNofity(message);
      }
    } catch (error) {
      warningNofity(error)
    }
  }, [postData, userInput, navigate]);


  // if (userDetl && location.pathname === '/') {
  //   return <Navigate to="/qrscan" replace />;
  // };

  return (
    <Grid
      container
      alignItems="stretch"
      justifyContent="center"
      sx={{
        width: '100vw',
        height: '100vh',
      }}>
      <Grid>
        <Box sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          paddingTop: { xs: isSmallHeight ? 10 : 0 },
          alignItems: 'center',
          justifyContent: { xs: isSmallHeight ? "none" : 'center', sm: 'center', md: 'center', lg: 'center' },
          width: '100vw',
        }}>
          <Suspense fallback={
            <Skeleton
              variant="circular"
              width={80}
              height={80}
              sx={{
                background: 'linear-gradient(45deg,rgba(123, 31, 162, 0.59),rgba(194, 24, 92, 0.6),rgba(25, 118, 210, 0.62))'
              }}
            />
          }>
            <LoginlogoHeader />
          </Suspense>
          <Box
            sx={{
              borderRadius: 2,
              boxShadow: { xs: 0, sm: 3, lg: 3, xl: 3 },
              width: { lg: '450px', md: '450px', sm: '450px', xs: '90%' },
              height: '320px',
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography sx={{
              display: { xs: 'none', sm: 'block' },
              color: 'rgb(32, 33, 32)',
              fontSize: { xs: 12, sm: 16 },
              fontWeight: { xs: 100, sm: 400 },
            }}>Welcome Back, Please Log In!</Typography>
            <TextField
              sx={{
                width: { xs: '100%', sm: '90%' },
                marginTop: { xs: 3, sm: 2 }, height: 30, marginBottom: errors?.empidError ? 5 : 2,
                fontFamily: "var(--font-varient)",
              }}
              id="outlined-emloyee-input"
              label="Enter username"
              type="text"
              size='small'
              name='empid'
              autoComplete="current-password"
              onChange={handleChange}
              error={!!errors?.empidError}
              helperText={errors?.empidError}
              value={userInput?.empid}
            />
            <TextField
              sx={{
                width: { xs: '100%', sm: '90%' }, marginTop: { xs: 3, sm: 2 }, height: 30,
                marginBottom: errors?.passwordError ? 5 : 2,
                fontFamily: "var(--font-varient)",
              }}
              id="outlined-password-input"
              label="Enter Password"
              type="password"
              size='small'
              name='password'
              autoComplete="current-password"
              onChange={handleChange}
              error={!!errors?.passwordError}
              helperText={errors?.passwordError}
              value={userInput?.password}
            />
            <Button sx={{
              marginTop: { xs: 4, sm: 2 },
              width: { xs: '99%', sm: '90%' },
              height: { lg: 40, sm: 40, xs: 40 },
              fontWeight: { xs: 200, sm: 400 },
              borderRadius: { xs: 10, sm: 3 }
            }}
              variant="contained"
              onClick={handleloginform}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleloginform()
                }
              }}
            >LogIn Here</Button>
            <Typography
              sx={{
                display: { xs: 'block', sm: 'block' },
                marginTop: 1,
                color: 'rgb(53, 54, 53)',
                fontSize: { xs: 10, sm: 13 },
                fontWeight: { xs: 100, sm: 400 }
              }}
            >I acknowledge the rules and agree to comply.</Typography>
            <Link
              variant="contained"
              sx={{
                // marginTop: { sm: 1 },
                cursor: 'pointer',
                fontSize: { xs: 11, sm: 14, lg: 13 },
                fontWeight: { xs: 200, sm: 400 },
                color: 'rgb(53, 54, 53)',
              }}
            >Forget Password?</Link>
          </Box>
        </Box>
        <CopyRight />
      </Grid>
    </Grid>
  );
};
export default memo(RoootLayouts);

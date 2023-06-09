import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { startEmailRegistration } from '../../store/auth/thunks';

const initialForm = {
  displayName: '',
  email: '',
  password: '',
}

const formValidations = {
  displayName: [(value) => value.length >= 1, 'Full name is required'],
  email: [(value) => value.includes('@'), 'Email must have @'],
  password: [(value) => value.length >= 6, 'Password must have more than 6 characters'],
}

export const RegisterPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuth = useMemo(() => status === 'checking', [status]);

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { 
    displayName, email, password, onInputChange, formState,
    isFormValid, fullNameIsValid, emailIsValid, passwordIsValid 
  } = useForm(initialForm, formValidations);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if(!isFormValid) return;

    dispatch(startEmailRegistration(formState));
  }

  return (
    <AuthLayout title="Register">
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
          <Grid container>

            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Full name" 
                type="text" 
                placeholder="John Doe" 
                fullWidth
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                error={!!fullNameIsValid && formSubmitted}
                helperText={fullNameIsValid}
              />
            </Grid>

            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Email" 
                type="email" 
                placeholder="email@domain.com" 
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
                autoComplete="username"
                error={!!emailIsValid && formSubmitted}
                helperText={emailIsValid}
              />
            </Grid>

            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Password" 
                type="password" 
                placeholder="Password" 
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
                autoComplete="current-password"
                error={!!passwordIsValid && formSubmitted}
                helperText={passwordIsValid}
              />
            </Grid>

            <Grid container spacing={2} sx={{mb: 2, mt: 1}}>

              <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth disabled={isCheckingAuth}>
                  Create account
                </Button>
              </Grid>

            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Typography sx={{mr: 1}}>Do you have an account?</Typography>
              <Link component={RouterLink} color="inherit" to="/auth/login">
                Sign in
              </Link>
            </Grid>

          </Grid>
        </form>
    </AuthLayout>

    
  )
}

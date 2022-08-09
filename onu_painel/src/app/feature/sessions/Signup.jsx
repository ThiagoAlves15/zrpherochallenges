import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  FormControl,
  FormGroup,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography
} from '@mui/material';
import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { signUpUser, resetErrorState } from './sessionSlice';

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const errorMessages = useSelector((state) => state.session.errorMessages);
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const loading = false;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    emailRef?.current?.focus();

    if (errorMessages.length > 0) {
      setErrors(errorMessages);
      dispatch(resetErrorState());
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors([]);

    if (emailRef?.current === undefined
        || emailRef.current.value === ""
        || passwordRef?.current === undefined
        || passwordRef.current.value === ""
        || passwordConfirmationRef?.current === undefined
        || passwordConfirmationRef.current.value === ""
    ) {
      return setErrors(["Please fill out all fields"]);
    }

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setErrors(["Passwords do not match"]);
    }

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const response = await dispatch(signUpUser(payload));
    console.log(response);

    if (errorMessages.length > 0) {
      navigate("/");
    } else {
      return setErrors(errorMessages);
    }
  }

  const passwordInput =
    <OutlinedInput
      id="password"
      type={showPassword ? 'text' : 'password'}
      inputRef={passwordRef}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setShowPassword(!showPassword)}
            onMouseDown={() => setShowPassword(!showPassword)}
            edge="end"
          >
            { showPassword ? <Visibility /> : <VisibilityOff /> }
          </IconButton>
        </InputAdornment>
    } />;

  const passwordConfirmationInput =
    <OutlinedInput
      id="password-confirmation"
      type={showPassword ? 'text' : 'password'}
      inputRef={passwordConfirmationRef}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setShowPassword(!showPassword)}
            onMouseDown={() => setShowPassword(!showPassword)}
            edge="end"
          >
            { showPassword ? <Visibility /> : <VisibilityOff /> }
          </IconButton>
        </InputAdornment>
    } />;

  return (
    <section>
      <Container maxWidth="md" sx={{marginTop: '1em'}}>
        <Card sx={{boxShadow: 1, maxWidth: 'md'}}>
          <CardContent>
            <Container maxWidth="sm">
              <Typography variant="h2" color="text.primary" gutterBottom>
                Create account
              </Typography>

              {
                errors.length > 0 ?
                  <Alert severity="error" aria-live="assertive">
                    {errors.map((error, index) => {
                      return <p key={`alert-${index}`}>
                        {error}
                      </p>;
                    })}
                  </Alert> : <></>
              }

              <form onSubmit={handleSubmit}>
                <FormGroup row={true} id="email-group" sx={{marginTop: '1em'}}>
                  <FormControl fullWidth>
                    <InputLabel required htmlFor="email" id="email-label">Email Address</InputLabel>
                    <Input id="email" type="email" inputRef={emailRef} />
                  </FormControl>
                </FormGroup>

                <FormGroup row={true} id="password-group" sx={{marginTop: '1em'}}>
                  <FormControl fullWidth>
                    <InputLabel required htmlFor="password" id="password-label">Password</InputLabel>
                    { passwordInput }
                  </FormControl>
                </FormGroup>

                <FormGroup row={true} id="password-confirmation-group" sx={{marginTop: '1em'}}>
                  <FormControl fullWidth>
                    <InputLabel required htmlFor="password-confirmation" id="password-confirmation-label">Password Confirmation</InputLabel>
                    { passwordConfirmationInput }
                  </FormControl>
                </FormGroup>

                <FormGroup row={true} id="submit-group" sx={{marginTop: '1em'}}>
                  <FormControl fullWidth>
                    <Button
                      disabled={loading}
                      variant="contained"
                      color="primary"
                      type="submit"
                      id="submit-button"
                    >
                      Signup
                    </Button>
                  </FormControl>
                </FormGroup>
              </form>
            </Container>
          </CardContent>

          <Divider light={false} />

          <CardActions sx={{marginTop: '1em', justifyContent: 'center'}} disableSpacing >
            <Box>
              <Typography variant="body2" color="text.secondary" align="center">
                Already have an account? <Link to="/login">Login!</Link>
              </Typography>
            </Box>
          </CardActions>
        </Card>
      </Container>
    </section>
  )
}

export default Signup;

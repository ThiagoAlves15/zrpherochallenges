import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Alert,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormGroup,
  FormHelperText,
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
import { updateProfile, resetErrorState } from './sessionSlice';

function Profile() {
  const emailRef = useRef();
  const newEmailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const currentPasswordRef = useRef();
  const accessToken = useSelector((state) => state.session.accessToken);
  const errorMessages = useSelector((state) => state.session.errorMessages);
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
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
    const shouldUpdateEmail = emailRef?.current !== undefined && emailRef?.current?.value !== "";
    const shouldUpdatePassword = passwordRef?.current !== undefined && passwordRef?.current?.value !== "";
    const shouldUpdateProfile = shouldUpdateEmail || shouldUpdatePassword;

    if (!shouldUpdateProfile) {
      return setErrors(["Please fill fields for change"]);
    }

    if (shouldUpdateEmail) {
      if (emailRef.current.value !== newEmailRef.current.value) {
        setErrors(errors => [...errors, "Emails do not match"]);
      }
    }

    if (shouldUpdatePassword) {
      if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
        setErrors(errors => [...errors, "Passwords do not match"]);
      }
    }

    if (currentPasswordRef?.current?.value === undefined || currentPasswordRef.current.value === "") {
      setErrors(errors => [...errors, "Please enter your current password to confirm changes"]);
    }

    if (errors.length > 0) {
      return errors;
    }

    const payload = {
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
      currentPassword: currentPasswordRef.current.value,
      accessToken: accessToken
    };

    const response = await dispatch(updateProfile(payload));
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

  const currentPasswordInput =
    <OutlinedInput
      id="current-password"
      type={showCurrentPassword ? 'text' : 'password'}
      inputRef={currentPasswordRef}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle current password visibility"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            onMouseDown={() => setShowCurrentPassword(!showCurrentPassword)}
            edge="end"
          >
            { showCurrentPassword ? <Visibility /> : <VisibilityOff /> }
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
                Profile
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
                    <InputLabel htmlFor="email" id="email-label">Email address</InputLabel>
                    <Input id="email" type="email" inputRef={emailRef} />
                  </FormControl>
                </FormGroup>

                <FormGroup row={true} id="new-email-group" sx={{marginTop: '1em'}}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="email" id="new-email-label">Change email</InputLabel>
                    <Input id="new-email" type="email" inputRef={newEmailRef} />
                    <FormHelperText id="new-email-helper-text">
                      Leave blank if you wish to not change your email
                    </FormHelperText>
                  </FormControl>
                </FormGroup>

                <FormGroup row={true} id="password-group" sx={{marginTop: '1em'}}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="password" id="password-label">New Password</InputLabel>
                    { passwordInput }
                  </FormControl>
                </FormGroup>

                <FormGroup row={true} id="password-confirmation-group" sx={{marginTop: '1em'}}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="password-confirmation" id="password-confirmation-label">New Password confirmation</InputLabel>
                    { passwordConfirmationInput }
                    <FormHelperText id="new-email-helper-text">
                      Leave blank if you wish to not change your password
                    </FormHelperText>
                  </FormControl>
                </FormGroup>

                <FormGroup row={true} id="current-password-group" sx={{marginTop: '1em'}}>
                  <FormControl fullWidth>
                    <InputLabel required htmlFor="current-password" id="current-password-label">Current Password</InputLabel>
                    { currentPasswordInput }
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
                      Update account info
                    </Button>
                  </FormControl>
                </FormGroup>
              </form>
            </Container>
          </CardContent>
        </Card>
      </Container>
    </section>
  )
}

export default Profile;

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormGroup,
  Input,
  InputLabel
} from '@mui/material';
import { createHero, resetErrorState } from './heroSlice';

function FormHero() {
  const nameRef = useRef();
  const rankRef = useRef();
  const latitudeRef = useRef();
  const longitudeRef = useRef();

  const [name, setName] = useState('');
  const [rank, setRank] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const accessToken = useSelector((state) => state.session.accessToken);
  const errorMessages = useSelector((state) => state.heroes.errorMessages);
  const [errors, setErrors] = useState([]);
  const loading = false;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    nameRef?.current?.focus();

    if (errorMessages.length > 0) {
      setErrors(errorMessages);
      dispatch(resetErrorState());
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors([]);

    if (nameRef?.current === undefined
        || nameRef.current.value === ""
        || rankRef?.current === undefined
        || rankRef.current.value === ""
        || latitudeRef?.current === undefined
        || latitudeRef.current.value === ""
        || longitudeRef?.current === undefined
        || longitudeRef.current.value === ""
    ) {
      return setErrors(["Please fill out all fields"]);
    }

    const payload = {
      name: nameRef.current.value,
      rank: rankRef.current.value,
      latitude: latitudeRef.current.value,
      longitude: longitudeRef.current.value,
      accessToken: accessToken
    };

    const response = await dispatch(createHero(payload));
    console.log(response);

    if (errorMessages.length > 0) {
      navigate("/heroes");
    } else {
      return setErrors(errorMessages);
    }
  }

  return (
    <section>
      <Container maxWidth="md" sx={{marginTop: '1em'}}>
        <Card sx={{boxShadow: 1, maxWidth: 'md'}}>
          <CardContent>
            <Container maxWidth="sm">

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
                <FormGroup row={true} id="name-group" sx={{marginTop: '1em'}}>
                  <FormControl fullWidth>
                    <InputLabel required htmlFor="text" id="name-label">Hero name</InputLabel>
                    <Input
                      id="name"
                      type="text"
                      inputRef={nameRef}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                </FormGroup>

                <FormGroup row={true} id="rank-group" sx={{marginTop: '1em'}}>
                  <FormControl fullWidth>
                    <InputLabel required htmlFor="text" id="rank-label">Hero rank</InputLabel>
                    <Input
                      id="rank"
                      type="text"
                      inputRef={rankRef}
                      value={rank}
                      onChange={(e) => setRank(e.target.value)}
                    />
                  </FormControl>
                </FormGroup>

                <FormGroup row={true} id="latitude-group" sx={{marginTop: '1em'}}>
                  <FormControl fullWidth>
                    <InputLabel required htmlFor="text" id="latitude-label">Hero current latitude</InputLabel>
                    <Input
                      id="latitude"
                      type="text"
                      inputRef={latitudeRef}
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                    />
                  </FormControl>
                </FormGroup>

                <FormGroup row={true} id="longitude-group" sx={{marginTop: '1em'}}>
                  <FormControl fullWidth>
                    <InputLabel required htmlFor="text" id="longitude-label">Hero current longitude</InputLabel>
                    <Input
                      id="longitude"
                      type="text"
                      inputRef={longitudeRef}
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                    />
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
                      Create hero
                    </Button>
                  </FormControl>
                </FormGroup>
              </form>
            </Container>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}

export default FormHero;
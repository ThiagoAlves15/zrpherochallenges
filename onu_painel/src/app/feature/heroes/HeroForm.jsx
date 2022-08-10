import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { resetErrorState } from './heroSlice';

function FormHero(props) {
  const nameRef = useRef();
  const rankRef = useRef();
  const latitudeRef = useRef();
  const longitudeRef = useRef();

  const [name, setName] = useState(props.hero ? props.hero.name : '');
  const [rank, setRank] = useState(props.hero ? props.hero.rank : '');
  const [latitude, setLatitude] = useState(props.hero ? props.hero.latitude : '');
  const [longitude, setLongitude] = useState(props.hero ? props.hero.longitude : '');

  const errorMessages = useSelector((state) => state.heroes.errorMessages);
  const [errors, setErrors] = useState([]);
  const loading = false;

  useEffect(() => {
    nameRef?.current?.focus();

    if (errorMessages.length > 0) {
      setErrors(errorMessages);
      props.dispatch(resetErrorState());
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

    const id = props.hero ? props.hero.id : 0;

    const payload = {
      id: id,
      name: nameRef.current.value,
      rank: rankRef.current.value,
      latitude: latitudeRef.current.value,
      longitude: longitudeRef.current.value,
      accessToken: props.accessToken
    };

    await props.action(payload);
  }

  return (
    <section>
      <Container maxWidth="md" sx={{mt: '1em', mb: '1em'}}>
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
                    <InputLabel required htmlFor="text" id="name-label">{props.type} name</InputLabel>
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
                    <InputLabel required htmlFor="text" id="rank-label">{props.type} rank</InputLabel>
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
                    <InputLabel required htmlFor="text" id="latitude-label">{props.type} current latitude</InputLabel>
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
                    <InputLabel required htmlFor="text" id="longitude-label">{props.type} current longitude</InputLabel>
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
                      Submit
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
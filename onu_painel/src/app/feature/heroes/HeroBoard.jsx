import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Container, Collapse } from '@mui/material';
import { fetchHeroes, createHero, updateHero, deleteHero, resetErrorState } from './heroSlice';
import Hero from './Hero';
import HeroForm from './HeroForm';

function HeroBoard() {
  const heroes = useSelector((state) => state.heroes.heroes);
  const accessToken = useSelector((state) => state.session.accessToken);
  const errorMessages = useSelector((state) => state.heroes.errorMessages);
  const [errors, setErrors] = useState([]);
  const [isEditing, setIsEditing] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeroes(accessToken))

    if (errorMessages.length > 0) {
      setErrors(errorMessages);
      dispatch(resetErrorState());
    }
  }, [dispatch]);

  function toggleCreateForm() {
    if (isCreating) {
      setIsCreating(false);
    } else {
      setIsCreating(true);
    }
  }

  function toggleEditForm(heroId) {
    if (isEditing === heroId) {
      setIsEditing(0);
    } else {
      setIsEditing(heroId);
    }
  }

  async function submitCreate(formData) {
    const response = await dispatch(createHero(formData));
    console.log(response);

    if (errorMessages.length > 0) {
      return setErrors(errorMessages);
    } else {
      toggleCreateForm();
      return setSuccessMessage(`Created new hero ${response.payload.name}!`);
    }
  }

  async function submitEdit(formData) {
    const response = await dispatch(updateHero(formData));
    console.log(response);

    if (errorMessages.length > 0) {
      return setErrors(errorMessages);
    } else {
      toggleEditForm();
      return setSuccessMessage(`Updated hero ${response.payload.name}!`);
    }
  }

  async function submitDelete(formData) {
    const response = await dispatch(deleteHero(formData));
    console.log(response);

    if (errorMessages.length > 0) {
      return setErrors(errorMessages);
    } else {
      return setSuccessMessage(`Deleted hero ${formData.name}!`);
    }
  }

  return (
    <Container>
      {
          <Collapse in={successMessage !== ""}>
            <Alert
              severity="success"
              sx={{ boxShadow: 1, mt: '1em', mb: '1em' }}
              onClose={() => setSuccessMessage("")}
            >
              { successMessage }
            </Alert>
          </Collapse>
      }

      {
        <Collapse in={errors.length > 0}>
          <Alert
            severity="error"
            sx={{ boxShadow: 1, mt: '1em', mb: '1em' }}
            aria-live="assertive"
            onClose={() => setErrors([])}
          >
            {errors.map((error, index) => {
              return <p key={`alert-${index}`}>
                {error}
              </p>;
            })}
          </Alert>
        </Collapse>
      }

      <h1>HeroBoard</h1>

      <Button
        variant="contained"
        color="primary"
        id="create-button"
        onClick={() => toggleCreateForm()}
      >
        Create hero
      </Button>

      {
        isCreating ?
        <HeroForm
          type="Hero"
          dispatch={dispatch}
          action={submitCreate}
          accessToken={accessToken}
        /> : ""
      }

      <div>
        {
          heroes && heroes.length > 0 && heroes.map(hero => {
            return (
              <div key={hero.id}>
                <Hero
                  dispatch={dispatch}
                  accessToken={accessToken}
                  hero={hero}
                  toggleEditForm={() => toggleEditForm(hero.id)}
                  isEditing={isEditing}
                  submitEdit={submitEdit}
                  submitDelete={submitDelete}
                />
              </div>
            );
          })
        }
      </div>
    </Container>
  )
}

export default HeroBoard;

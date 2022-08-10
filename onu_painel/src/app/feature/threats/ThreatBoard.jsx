import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Container, Collapse } from '@mui/material';
import { fetchThreats, createThreat, updateThreat, deleteThreat, resetErrorState } from './threatSlice';
import Threat from './Threat';
import ThreatForm from './ThreatForm';

function ThreatBoard() {
  const threats = useSelector((state) => state.threats.threats);
  const accessToken = useSelector((state) => state.session.accessToken);
  const errorMessages = useSelector((state) => state.threats.errorMessages);
  const [errors, setErrors] = useState([]);
  const [isEditing, setIsEditing] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchThreats(accessToken))

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

  function toggleEditForm(threatId) {
    if (isEditing === threatId) {
      setIsEditing(0);
    } else {
      setIsEditing(threatId);
    }
  }

  async function submitCreate(formData) {
    const response = await dispatch(createThreat(formData));
    console.log(response);

    if (errorMessages.length > 0) {
      return setErrors(errorMessages);
    } else {
      toggleCreateForm();
      return setSuccessMessage(`Created new threat ${response.payload.name}!`);
    }
  }

  async function submitEdit(formData) {
    const response = await dispatch(updateThreat(formData));
    console.log(response);

    if (errorMessages.length > 0) {
      return setErrors(errorMessages);
    } else {
      toggleEditForm();
      return setSuccessMessage(`Updated threat ${response.payload.name}!`);
    }
  }

  async function submitDelete(formData) {
    const response = await dispatch(deleteThreat(formData));
    console.log(response);

    if (errorMessages.length > 0) {
      return setErrors(errorMessages);
    } else {
      return setSuccessMessage(`Deleted threat ${formData.name}!`);
    }
  }

  return (
    <Container>
      {
          <Collapse in={successMessage !== ""}>
            <Alert
              severity="success"
              sx={{ boxShadow: 1, mt: 4, mb: 4 }}
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
            sx={{ boxShadow: 1, mt: 4, mb: 4 }}
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

      <h1>ThreatBoard</h1>

      <Button
        variant="contained"
        color="primary"
        id="create-button"
        onClick={() => toggleCreateForm()}
      >
        Create threat
      </Button>

      {
        isCreating ?
        <ThreatForm
          type="Threat"
          dispatch={dispatch}
          action={submitCreate}
          accessToken={accessToken}
        /> : ""
      }

      <div>
        {
          threats && threats.length > 0 && threats.map(threat => {
            return (
              <div key={threat.id}>
                <Threat
                  dispatch={dispatch}
                  accessToken={accessToken}
                  threat={threat}
                  toggleEditForm={() => toggleEditForm(threat.id)}
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

export default ThreatBoard;

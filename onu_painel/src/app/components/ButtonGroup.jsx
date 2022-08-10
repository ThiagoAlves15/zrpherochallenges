import { Button } from '@mui/material';

function ButtonGroup(props) {

  function handleDelete() {
    const payload = {
      id: props.id,
      name: props.name,
      accessToken: props.accessToken
    }

    props.delete(payload);
  }

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        id="edit-button"
        onClick={() => props.toggleEditForm()}
      >
        Edit {props.type}
      </Button>

      <Button
        variant="contained"
        color="warning"
        id="delete-button"
        onClick={() => handleDelete()}
      >
        Delete {props.type}
      </Button>
    </div>
  );
}

export default ButtonGroup;
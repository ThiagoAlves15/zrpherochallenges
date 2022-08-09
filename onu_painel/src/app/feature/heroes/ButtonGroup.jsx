import { deleteHero } from './heroSlice';
import {
  Button
} from '@mui/material';

function ButtonGroup(props) {

  function handleDelete(event) {
    const payload = {
      heroId: props.heroId,
      accessToken: props.accessToken
    }

    props.dispatch(deleteHero(payload));
  }

  return (
    <div>
      <Button
        variant="contained"
        color="warning"
        id="edit-button"
        onClick={() => props.toggleEditForm()}
      >
        Edit hero
      </Button>

      <Button
        variant="contained"
        color="secondary"
        id="delete-button"
        onClick={(e) => handleDelete(e)}
      >
        Delete hero
      </Button>
    </div>
  );
}

export default ButtonGroup;
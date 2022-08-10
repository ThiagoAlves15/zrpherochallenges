import { useEffect, useState } from 'react';
import ThreatForm from './ThreatForm';
import ButtonGroup from '../../components/ButtonGroup';

function Threat(props) {
  const [isEditing, setIsEditing] = useState(props.isEditing === props.threat.id);

  useEffect(() => {
    setIsEditing(props.isEditing === props.threat.id);
  }, [props.isEditing, props.threat.id]);

  return(
    <div>
      {
        isEditing ?
          <ThreatForm
            type="Threat"
            threat={props.threat}
            dispatch={props.dispatch}
            action={props.submitEdit}
            accessToken={props.accessToken}
          /> :
          <div>
            <p>Name: {props.threat.name}</p>
            <p>Tier: {props.threat.tier}</p>
            <p>Location: {props.threat.latitude} | {props.threat.longitude}</p>
          </div>
      }

      <ButtonGroup
        id={props.threat.id}
        name={props.threat.name}
        type="threat"
        accessToken={props.accessToken}
        toggleEditForm={props.toggleEditForm}
        delete={props.submitDelete}
      />
    </div>
  );
}

export default Threat;

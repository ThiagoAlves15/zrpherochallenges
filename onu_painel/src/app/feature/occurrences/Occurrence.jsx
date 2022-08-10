import { useEffect, useState } from 'react';
import { Divider } from '@mui/material';

function Occurence(props) {
  return(
    <div>
      <Divider />
      <p>Hero name: {props.occurrence.hero.name}</p>
      <p>Threat name: {props.occurrence.threat.name}</p>
      <p>Resolved: {props.occurrence.resolved ? "Yes" : "No"}</p>
      <Divider />
    </div>
  );
}

export default Occurence;

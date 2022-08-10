import { useEffect, useState } from 'react';

function Occurence(props) {
  return(
    <div>
      <p>Hero name: {props.occurrence.hero.name}</p>
      <p>Threat name: {props.occurrence.threat.name}</p>
      <p>Resolved: {props.occurrence.resolved ? "Yes" : "No"}</p>
    </div>
  );
}

export default Occurence;

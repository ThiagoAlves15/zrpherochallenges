import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreatPolling from '../threats/ThreatPolling';
import Timer from './Timer';
import Occurrence from './Occurrence';
import { fetchOccurrences, createOccurrence, resetErrorState } from './occurrenceSlice';

function OnuBoard() {
  const occurrences = useSelector((state) => state.occurrences.occurrences);
  const accessToken = useSelector((state) => state.session.accessToken);
  const errorMessages = useSelector((state) => state.heroes.errorMessages);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOccurrences(accessToken))

    if (errorMessages.length > 0) {
      setErrors(errorMessages);
      dispatch(resetErrorState());
    }
  }, [dispatch]);

  return (
    <section>
      <h1>OnuBoard</h1>

      <ThreatPolling />

      <Timer
        dispatch={dispatch}
        action={createOccurrence}
        accessToken={accessToken}
      />

      {
        occurrences && occurrences.length > 0 && occurrences.map(occurrence => {
          return (
            <div key={occurrence.id}>
              <Occurrence
                occurrence={occurrence}
              />
            </div>
          );
        })
      }
    </section>
  )
}

export default OnuBoard;

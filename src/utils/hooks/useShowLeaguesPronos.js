import { useEffect, useState } from 'react';

export const useShowLeaguesPronos = (showLeaguePronos, setShowLeaguePronos) => {
  const [showLeagues, setShowLeagues] = useState(false);

  useEffect(() => {
    if (showLeaguePronos && setShowLeagues) {
      setShowLeagues(false);
      setShowLeaguePronos(false);
    }
  }, [showLeaguePronos, setShowLeaguePronos]);

  const seeLeaguePronos = () => {
    setShowLeaguePronos(true);
    setTimeout(() => setShowLeagues(!showLeagues), 100);
  };

  return {
    showLeagues,
    setShowLeagues,
    seeLeaguePronos,
  };
};

import { useEffect, useState } from 'react';
import StarContext from './context';

function StarProvider({ children }: { children: React.ReactNode }) {
  const [starData, setStarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const noResidents = data.results.map((planet: any) => {
        const { residents, ...rest } = planet;
        return rest;
      });
      setStarData(noResidents);
    };
    fetchData();
  }, []);

  return <StarContext.Provider value={ { starData } }>{children}</StarContext.Provider>;
}

export default StarProvider;

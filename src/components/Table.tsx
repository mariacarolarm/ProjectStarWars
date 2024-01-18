import { useContext, useEffect } from 'react';
import StarContext from '../context/context';
import { PlanetProp } from '../types/types';
import FirstFilters from './FirstFilters';

function StarTable() {
  const { starData, planetFilter,
    setPlanetFilter, filteredData } = useContext(StarContext);

  useEffect(() => {
    setPlanetFilter('');
  }, [filteredData, setPlanetFilter]);

  const dataToDisplay = filteredData.length > 0 ? filteredData : starData;

  const keys = Object.keys(dataToDisplay[0] || {});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlanetFilter(event.target.value);
  };

  const filteredStarData = dataToDisplay
    .filter((planet: PlanetProp) => planet.name.toLowerCase()
      .includes(planetFilter.toLowerCase()));

  return (
    <>
      <h1>Projeto Star Wars - Trybe</h1>
      <input
        type="text"
        data-testid="name-filter"
        value={ planetFilter }
        onChange={ handleChange }
      />
      <FirstFilters />
      <table>
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={ key }>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredStarData.map((planet: PlanetProp) => (
            <tr key={ planet.name }>
              {keys.map((key) => (
                <td key={ key }>{planet[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default StarTable;

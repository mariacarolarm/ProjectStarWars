import React, { useContext } from 'react';
import StarContext from '../context/context';

type PlanetProp = {
  name: string;
  [key: string]: any;
};

function StarTable() {
  const { starData, planetFilter, setPlanetFilter } = useContext(StarContext);

  const keys = Object.keys(starData[0] || {});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlanetFilter(event.target.value);
  };

  const filteredStarData = starData
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

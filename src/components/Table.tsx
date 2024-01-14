import React, { useContext } from 'react';
import StarContext from '../context/context';

type PlanetProp = {
  name: string;
  [key: string]: any;
};

function StarTable() {
  const { starData } = useContext(StarContext);

  const keys = Object.keys(starData[0] || {});

  return (
    <table>
      <thead>
        <tr>
          {keys.map((key) => (
            <th key={ key }>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {starData.map((planet: PlanetProp) => (
          <tr key={ planet.name }>
            {keys.map((key) => (
              <td key={ key }>{planet[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StarTable;

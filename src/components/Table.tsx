import { useContext, useState } from 'react';
import StarContext from '../context/context';

type PlanetProp = {
  name: string;
  [key: string]: any;
};

const filterOptions = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];
const comparisonOptions = ['maior que', 'menor que', 'igual a'];

function StarTable() {
  const {
    starData,
    planetFilter,
    setPlanetFilter,
    addFilter,
    clearFilters,
  } = useContext(StarContext);
  const [selectedFilter, setSelectedFilter] = useState('population');
  const [selectedComparison, setSelectedComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState('0');
  const [filteredStarData, setFilteredStarData] = useState<PlanetProp[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  const keys = Object.keys(starData[0] || {});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlanetFilter(event.target.value);
  };

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    type: string,
  ) => {
    const { value } = event.target;

    if (type === 'filter') {
      setSelectedFilter(value);
    } else if (type === 'comparison') {
      setSelectedComparison(value);
    }
  };

  const handleFilter = () => {
    const newFilteredData = starData.filter((planet: PlanetProp) => {
      const planetValue = parseInt(planet[selectedFilter], 10);
      const inputValue = parseInt(filterValue, 10);

      if (selectedComparison === 'maior que') {
        return planetValue > inputValue;
      } if (selectedComparison === 'menor que') {
        return planetValue < inputValue;
      } if (selectedComparison === 'igual a') {
        return planetValue === inputValue;
      }

      return true;
    });

    setFilteredStarData(newFilteredData);
  };

  const handleFilterButtonClick = () => {
    handleFilter();
    setAppliedFilters((prevFilters) => [
      ...prevFilters,
      `${selectedFilter} ${selectedComparison} ${filterValue}`,
    ]);
    addFilter(`${selectedFilter} ${selectedComparison} ${filterValue}`);
  };

  const handleClearButtonClick = () => {
    clearFilters();
    setAppliedFilters([]);
  };

  return (
    <>
      <h1>Projeto Star Wars - Trybe</h1>
      <input
        type="text"
        data-testid="name-filter"
        value={ planetFilter }
        onChange={ handleChange }
      />
      <div>
        <select
          name="filter"
          id="filter"
          data-testid="column-filter"
          onChange={ (e) => handleFilterChange(e, 'filter') }
          value={ selectedFilter }
        >
          {filterOptions.map((option) => (
            <option key={ option } value={ option }>
              {option}
            </option>
          ))}
        </select>
        <select
          name="comparison"
          id="comparison"
          data-testid="comparison-filter"
          onChange={ (e) => handleFilterChange(e, 'comparison') }
          value={ selectedComparison }
        >
          {comparisonOptions.map((option) => (
            <option key={ option } value={ option }>
              {option}
            </option>
          ))}
        </select>
        <input
          type="number"
          data-testid="value-filter"
          value={ filterValue }
          onChange={ (e) => setFilterValue(e.target.value) }
        />
        <button
          data-testid="button-filter"
          onClick={ handleFilterButtonClick }
        >
          Filtrar
        </button>
        <button
          data-testid="button-clear"
          onClick={ handleClearButtonClick }
        >
          Limpar Filtros
        </button>
      </div>
      <div>
        {appliedFilters.length > 0 && (
          <div>
            <strong>Filtros Aplicados:</strong>
            <ul>
              {appliedFilters.map((filter, index) => (
                <li key={ index }>{filter}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
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

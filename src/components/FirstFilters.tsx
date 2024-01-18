import { useContext, useState } from 'react';
import StarContext from '../context/context';
import { PlanetProp } from '../types/types';

const filterOptions = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];
const comparisonOptions = ['maior que', 'menor que', 'igual a'];

function FirstFilters() {
  const { starData, setPlanetFilter, setFilteredData } = useContext(StarContext);
  const [selectedFilter, setSelectedFilter] = useState('population');
  const [selectedComparison, setSelectedComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState('0');

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
    const filteredData = starData.filter((planet: PlanetProp) => {
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

    setFilteredData(filteredData);
    setPlanetFilter('');
  };

  const filters = `${selectedFilter} ${selectedComparison} ${filterValue}`;

  return (
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
        onClick={ () => handleFilter() }
      >
        Filtrar
      </button>
      <p data-testid="column-filter-value">{filters}</p>
    </div>
  );
}

export default FirstFilters;

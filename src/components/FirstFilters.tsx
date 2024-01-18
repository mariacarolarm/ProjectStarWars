import { useContext, useState, useEffect } from 'react';
import StarContext from '../context/context';
import { PlanetProp } from '../types/types';

const filterOptions = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];
const comparisonOptions = ['maior que', 'menor que', 'igual a'];

function FirstFilters() {
  const { starData, setPlanetFilter, setFilteredData } = useContext(StarContext);
  const [filters, setFilters] = useState<{ filter: string;
    comparison: string; value: string }[]>([]);
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
    const newFilter = {
      filter: selectedFilter,
      comparison: selectedComparison,
      value: filterValue,
    };

    setFilters((prevFilters) => [...prevFilters, newFilter]);
  };

  useEffect(() => {
    const filteredData = starData.filter((planet: PlanetProp) => {
      return filters.every((filter) => {
        const planetValue = parseInt(planet[filter.filter], 10);
        const inputValue = parseInt(filter.value, 10);

        if (filter.comparison === 'maior que') {
          return planetValue > inputValue;
        } if (filter.comparison === 'menor que') {
          return planetValue < inputValue;
        } if (filter.comparison === 'igual a') {
          return planetValue === inputValue;
        }

        return true;
      });
    });

    setFilteredData(filteredData);
    setPlanetFilter('');
  }, [filters, starData, setFilteredData, setPlanetFilter]);

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

      {filters.map((filter, index) => (
        <div key={ index }>
          {filter.filter}
          {' '}
          {filter.comparison}
          {' '}
          {filter.value}
        </div>
      ))}
    </div>
  );
}

export default FirstFilters;

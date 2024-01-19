import React, { useContext, useState, useEffect } from 'react';
import StarContext from '../context/context';
import { PlanetProp } from '../types/types';

const comparisonOptions = ['maior que', 'menor que', 'igual a'];

function FirstFilters() {
  const { starData, setPlanetFilter, setFilteredData } = useContext(StarContext);
  const [filterSets, setFilterSets] = useState<{ filter: string;
    comparison: string; value: string }[][]>([]);
  const [selectedComparison, setSelectedComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState('0');
  const [filterOptions, setFilterOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);
  const [usedFilters, setUsedFilters] = useState<string[]>([]);

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

    if (!usedFilters.includes(selectedFilter)) {
      setUsedFilters((prevUsedFilters) => [...prevUsedFilters, selectedFilter]);
      setFilterOptions((prevOptions) => prevOptions
        .filter((option) => option !== selectedFilter));

      setFilterSets((prevFilterSets) => [...prevFilterSets, [newFilter]]);
    }

    setSelectedFilter(filterOptions[0]);
  };

  const handleExcludeFilter = (index: number) => {
    const excludedFilter = filterSets[index][0].filter;

    setUsedFilters((prevUsedFilters) => prevUsedFilters
      .filter((filter) => filter !== excludedFilter));

    setFilterOptions((prevOptions) => [...prevOptions, excludedFilter]);

    setFilterSets((prevFilterSets) => prevFilterSets.filter((_, i) => i !== index));
  };

  const handleRemoveAllFilters = () => {
    setUsedFilters([]);
    setFilterOptions(filterOptions);

    setFilterSets([]);
  };

  useEffect(() => {
    const combinedFilters = filterSets.reduce((acc, filters) => acc.concat(filters), []);

    const filteredData = starData.filter((planet: PlanetProp) => {
      return combinedFilters.every((filter) => {
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
  }, [filterSets, starData, setFilteredData, setPlanetFilter]);

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

      {filterSets.map((filters, setIndex) => (
        <div key={ setIndex }>
          {filters.map((filter, index) => (
            <div data-testid="filter" key={ index }>
              {filter.filter}
              {' '}
              {filter.comparison}
              {' '}
              {filter.value}
              <button onClick={ () => handleExcludeFilter(setIndex) }>Excluir</button>
            </div>
          ))}
        </div>
      ))}

      <button
        data-testid="button-remove-filters"
        onClick={ handleRemoveAllFilters }
      >
        Remover todas filtragens

      </button>
    </div>
  );
}

export default FirstFilters;

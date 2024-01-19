import { useState, useContext } from 'react';
import StarContext from '../context/context';

function SortFilters() {
  const { starData, setFilteredData } = useContext(StarContext);
  const [sortColumn, setSortColumn] = useState('population');
  const [sortOrder, setSortOrder] = useState('ASC');

  const handleSortColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortColumn(e.target.value);
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortOrder(e.target.value);
  };

  const handleSortButtonClick = () => {
    const sortedData = [...starData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue === 'unknown') return 1;
      if (bValue === 'unknown') return -1;

      if (sortOrder === 'ASC') {
        return aValue - bValue;
      }
      return bValue - aValue;
    });

    setFilteredData(sortedData);
  };

  return (
    <div>
      <select
        data-testid="column-sort"
        value={ sortColumn }
        onChange={ handleSortColumnChange }
      >
        {['population', 'orbital_period', 'diameter',
          'rotation_period', 'surface_water'].map((option) => (
            <option key={ option } value={ option }>
              {option}
            </option>
        ))}
      </select>

      <div>
        <label htmlFor="ascendente">
          Ascendente
        </label>
        <input
          type="radio"
          name="sortOrder"
          data-testid="column-sort-input-asc"
          value="ASC"
          onChange={ handleSortOrderChange }
          checked={ sortOrder === 'ASC' }
        />

        <label htmlFor="descendente">
          Descendente
        </label>
        <input
          type="radio"
          name="sortOrder"
          data-testid="column-sort-input-desc"
          value="DESC"
          onChange={ handleSortOrderChange }
          checked={ sortOrder === 'DESC' }
        />
      </div>

      <div>
        <button data-testid="column-sort-button" onClick={ handleSortButtonClick }>
          Ordenar
        </button>
      </div>
    </div>
  );
}

export default SortFilters;

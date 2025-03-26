import React, { useState } from 'react';
import './Filters.css';

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  search: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
}

const brands = ['Todos', 'Tesla', 'Honda', 'Volkswagen', 'Toyota', 'BMW', 'Mercedes'];

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    brand: 'Todos',
    minPrice: 0,
    maxPrice: 500000,
    sortBy: 'name'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="filters-container">
      <div className="search-box">
        <input
          type="text"
          name="search"
          placeholder="Buscar carro..."
          value={filters.search}
          onChange={handleChange}
        />
      </div>

      <div className="filters-grid">
        <div className="filter-group">
          <label htmlFor="brand">Marca:</label>
          <select name="brand" id="brand" value={filters.brand} onChange={handleChange}>
            {brands.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="minPrice">Preço Mínimo:</label>
          <input
            type="number"
            name="minPrice"
            id="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            min="0"
            step="1000"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="maxPrice">Preço Máximo:</label>
          <input
            type="number"
            name="maxPrice"
            id="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            min="0"
            step="1000"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="sortBy">Ordenar por:</label>
          <select name="sortBy" id="sortBy" value={filters.sortBy} onChange={handleChange}>
            <option value="name">Nome</option>
            <option value="price-asc">Preço (Menor para Maior)</option>
            <option value="price-desc">Preço (Maior para Menor)</option>
            <option value="brand">Marca</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters; 
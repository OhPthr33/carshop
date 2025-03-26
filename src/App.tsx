import React, { useState } from 'react';
import './App.css';
import Filters from './components/Filters';
import CarDetails from './components/CarDetails';

interface Car {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  specifications?: {
    year: number;
    mileage: number;
    transmission: string;
    fuel: string;
    color: string;
    power: string;
  };
}

interface FilterState {
  search: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
}

const cars: Car[] = [
  {
    id: 1,
    name: "Modelo X",
    brand: "Tesla",
    price: 150000,
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Carro elétrico de alto desempenho",
    specifications: {
      year: 2024,
      mileage: 0,
      transmission: "Automático",
      fuel: "Elétrico",
      color: "Branco",
      power: "500 cv"
    }
  },
  {
    id: 2,
    name: "Civic",
    brand: "Honda",
    price: 120000,
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Sedan confiável e econômico",
    specifications: {
      year: 2023,
      mileage: 15000,
      transmission: "Automático",
      fuel: "Flex",
      color: "Vermelho",
      power: "170 cv"
    }
  },
  {
    id: 3,
    name: "Golf",
    brand: "Volkswagen",
    price: 130000,
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Hatchback versátil e moderno",
    specifications: {
      year: 2023,
      mileage: 20000,
      transmission: "Automático",
      fuel: "Flex",
      color: "Preto",
      power: "150 cv"
    }
  },
  {
    id: 4,
    name: "Corolla",
    brand: "Toyota",
    price: 125000,
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Sedan confortável e econômico",
    specifications: {
      year: 2024,
      mileage: 0,
      transmission: "Automático",
      fuel: "Flex",
      color: "Prata",
      power: "140 cv"
    }
  },
  {
    id: 5,
    name: "Série 3",
    brand: "BMW",
    price: 250000,
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Sedan esportivo de luxo",
    specifications: {
      year: 2024,
      mileage: 0,
      transmission: "Automático",
      fuel: "Flex",
      color: "Azul",
      power: "258 cv"
    }
  }
];

function App() {
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const handleFilterChange = (filters: FilterState) => {
    let filtered = [...cars];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(car => 
        car.name.toLowerCase().includes(searchTerm) ||
        car.brand.toLowerCase().includes(searchTerm) ||
        car.description.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.brand !== 'Todos') {
      filtered = filtered.filter(car => car.brand === filters.brand);
    }

    filtered = filtered.filter(car => 
      car.price >= filters.minPrice && 
      car.price <= filters.maxPrice
    );

    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'brand':
        filtered.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredCars(filtered);
  };

  const handleCarClick = (car: Car) => {
    setSelectedCar(car);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>CarShop Premium</h1>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#catalogo">Catálogo</a></li>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h2>Encontre o Carro dos Seus Sonhos</h2>
          <p>Os melhores veículos com as melhores condições</p>
        </section>

        <section className="catalog">
          <h2>Nossos Veículos</h2>
          <Filters onFilterChange={handleFilterChange} />
          <div className="car-grid">
            {filteredCars.map(car => (
              <div key={car.id} className="car-card" onClick={() => handleCarClick(car)}>
                <img src={car.image} alt={car.name} />
                <h3>{car.name}</h3>
                <p className="brand">{car.brand}</p>
                <p className="price">R$ {car.price.toLocaleString()}</p>
                <p className="description">{car.description}</p>
                <button className="buy-button">Ver Detalhes</button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 CarShop Premium. Todos os direitos reservados.</p>
      </footer>

      {selectedCar && (
        <CarDetails
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
        />
      )}
    </div>
  );
}

export default App;

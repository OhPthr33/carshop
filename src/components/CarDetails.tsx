import React from 'react';
import './CarDetails.css';

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

interface CarDetailsProps {
  car: Car;
  onClose: () => void;
}

const CarDetails: React.FC<CarDetailsProps> = ({ car, onClose }) => {
  return (
    <div className="car-details-overlay">
      <div className="car-details-content">
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="car-details-grid">
          <div className="car-image-section">
            <img src={car.image} alt={car.name} />
            <div className="car-gallery">
              <img src={car.image} alt={`${car.name} - Vista 1`} />
              <img src={car.image} alt={`${car.name} - Vista 2`} />
              <img src={car.image} alt={`${car.name} - Vista 3`} />
            </div>
          </div>

          <div className="car-info-section">
            <h2>{car.name}</h2>
            <p className="brand">{car.brand}</p>
            <p className="price">R$ {car.price.toLocaleString()}</p>
            <p className="description">{car.description}</p>

            <div className="specifications">
              <h3>Especificações Técnicas</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Ano</span>
                  <span className="spec-value">{car.specifications?.year || '2024'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Quilometragem</span>
                  <span className="spec-value">{car.specifications?.mileage || '0'} km</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Câmbio</span>
                  <span className="spec-value">{car.specifications?.transmission || 'Automático'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Combustível</span>
                  <span className="spec-value">{car.specifications?.fuel || 'Flex'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Cor</span>
                  <span className="spec-value">{car.specifications?.color || 'Branco'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Potência</span>
                  <span className="spec-value">{car.specifications?.power || '150 cv'}</span>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button className="test-drive-button">Agendar Test Drive</button>
              <button className="contact-button">Falar com Vendedor</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails; 
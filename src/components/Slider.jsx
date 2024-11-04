import React, { useState, useEffect } from 'react';
import './Slider.css';
import photosData from '../data/photo.json';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visiblePhotos, setVisiblePhotos] = useState(3); // Başlangıçta 3 fotoğraf gösteriliyor

  // Ekran boyutuna göre görünür fotoğraf sayısını ayarlama
  useEffect(() => {
    const updateVisiblePhotos = () => {
      if (window.innerWidth <= 540) {
        setVisiblePhotos(1); // 540px ve daha küçük ekranlar için 1 fotoğraf gösterilecek
      } else {
        setVisiblePhotos(3); // Daha büyük ekranlar için 3 fotoğraf gösterilecek
      }
    };

    updateVisiblePhotos(); // İlk yüklemede ayarlama
    window.addEventListener('resize', updateVisiblePhotos); // Pencere yeniden boyutlandırıldığında kontrol

    return () => {
      window.removeEventListener('resize', updateVisiblePhotos); // Component unmount olduğunda event listener'ı kaldır
    };
  }, []);

  // Sağ ve sol buton fonksiyonları
  const nextSlide = () => {
    if (currentIndex < photosData.length - visiblePhotos) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="slider">
      {/* Sol ok, en başta olduğumuzda gizlenecek */}
      {currentIndex > 0 && (
        <button className="left-arrow" onClick={prevSlide}>
          &lt;
        </button>
      )}
      <div className="slider-content">
        {photosData.slice(currentIndex, currentIndex + visiblePhotos).map((photo) => (
          <img key={photo.id} src={photo.url} alt={`Photo ${photo.id}`} />
        ))}
      </div>
      {/* Sağ ok, en son fotoğrafa ulaştığımızda gizlenecek */}
      {currentIndex < photosData.length - visiblePhotos && (
        <button className="right-arrow" onClick={nextSlide}>
          &gt;
        </button>
      )}
    </div>
  );
};

export default Slider;

import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const Heart = ({ active }) => (
  <span className={`fav-icon ${active ? 'active' : ''}`}>♥</span>
);

function Rating({ value, reviews }) {
  const filled = Math.floor(value);

  return (
    <div className="rating-row">
      <div className="star-row">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < filled ? 'filled' : 'empty'}>
            ★
          </span>
        ))}
      </div>

      <small>({reviews.toLocaleString()})</small>
    </div>
  );
}

function Swatches({ colors }) {
  return (
    <div className="swatch-row">
      {colors.slice(0, 4).map((shade, idx) => (
        <span
          key={idx}
          className={`shade-dot ${
            shade === '#fff' || shade === '#ffffff' ? 'light' : ''
          }`}
          style={{ background: shade }}
        />
      ))}

      {colors.length > 4 && (
        <small>+{colors.length - 4}</small>
      )}
    </div>
  );
}

export default function ProductCard({ product }) {
  const [saved, setSaved] = useState(false);
  const [bagState, setBagState] = useState(false);

  const badgeTone = useMemo(() => {
    if (product.badge === 'SALE') return 'sale-tag';
    if (product.badge === 'NEW') return 'new-tag';
    return '';
  }, [product.badge]);

  const quickAdd = (e) => {
    e.preventDefault();
    setBagState(true);

    setTimeout(() => {
      setBagState(false);
    }, 1500);
  };

  return (
    <Link to={`/product/${product.id}`} className="item-card">
      <div className="media-box">
        {product.badge && (
          <div className={`tag-badge ${badgeTone}`}>
            {product.badge}
          </div>
        )}

        <button
          className="wishlist"
          onClick={(e) => {
            e.preventDefault();
            setSaved(!saved);
          }}
        >
          <Heart active={saved} />
        </button>

        <img src={product.image} alt={product.name} className="front-image" />
        <img src={product.hoverImage} alt="" className="back-image" />

        <button className="bag-btn" onClick={quickAdd}>
          {bagState ? '✓ Added to Bag' : 'Quick Add'}
        </button>
      </div>

      <section className="details">
        <h4>{product.name}</h4>
        <p className="category-text">{product.category}</p>

        <Swatches colors={product.colors} />
        <Rating value={product.rating} reviews={product.reviews} />

        <div className="price-row">
          <span className="current-price">
            ₹{product.price.toLocaleString('en-IN')}
          </span>

          <span className="old-price">
            ₹{product.originalPrice.toLocaleString('en-IN')}
          </span>

          <span className="discount-text">
            ({product.discount}% off)
          </span>
        </div>
      </section>
    </Link>
  );
}
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function Rating({ value }) {
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
      <small>({value})</small>
    </div>
  );
}

export default function ProductCard({ product }) {
  const [saved, setSaved] = useState(false);

  const originalPrice = Math.round(
    product.price / (1 - product.discountPercentage / 100)
  );

  return (
    <Link to={`/product/${product.id}`} className="item-card">
      <div className="media-box">
        <button
          className="wishlist"
          onClick={(e) => {
            e.preventDefault();
            setSaved(!saved);
          }}
        >
          {saved ? '♥' : '♡'}
        </button>

        <img
          src={product.thumbnail}
          alt={product.title}
          className="front-image"
        />
      </div>

      <section className="details">
        <h4>{product.title}</h4>
        <p className="category-text">{product.category}</p>

        <Rating value={product.rating} />

        <div className="price-row">
          <span className="current-price">
            ₹{Math.round(product.price * 85)}
          </span>

          <span className="old-price">
            ₹{Math.round(originalPrice * 85)}
          </span>

          <span className="discount-text">
            ({Math.round(product.discountPercentage)}% off)
          </span>
        </div>
      </section>
    </Link>
  );
}
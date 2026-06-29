import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Product.css';

function renderStars(rating) {
  const full = Math.floor(rating);

  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={`star${i >= full ? ' empty' : ''}`}>
      ★
    </span>
  ));
}

export default function Product() {
  const { product_id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/${product_id}`
        );

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [product_id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const originalPrice = Math.round(
    product.price / (1 - product.discountPercentage / 100)
  );

  return (
    <div className="product-page">
      <Navbar />

      <nav className="breadcrumb">
        <Link to="/home">Home</Link>
        <span> / </span>
        <span>{product.title}</span>
      </nav>

      <div
        style={{
          display: 'flex',
          gap: '40px',
          padding: '40px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{ width: '400px', borderRadius: '12px' }}
          />
        </div>

        <div style={{ maxWidth: '500px' }}>
          <p>{product.category}</p>
          <h1>{product.title}</h1>

          <div>{renderStars(product.rating)}</div>

          <h2>₹{Math.round(product.price * 85)}</h2>

          <p style={{ textDecoration: 'line-through' }}>
            ₹{Math.round(originalPrice * 85)}
          </p>

          <p>{Math.round(product.discountPercentage)}% Off</p>

          <p style={{ marginTop: '20px' }}>
            {product.description}
          </p>

          <p style={{ marginTop: '20px' }}>
            <strong>Brand:</strong> {product.brand}
          </p>

          <p>
            <strong>Stock:</strong> {product.stock}
          </p>

          <button
            style={{
              marginTop: '30px',
              padding: '14px 28px',
              cursor: 'pointer',
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
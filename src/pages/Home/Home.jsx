import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import OfferBanner from '../../components/OfferBanner/OfferBanner';
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid';
import ProductCard from '../../components/ProductCard/ProductCard';
import CountdownTimer from '../../components/CountdownTimer/CountdownTimer';
import './Home.css';

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Beauty', value: 'beauty' },
  { label: 'Fragrances', value: 'fragrances' },
  { label: 'Furniture', value: 'furniture' },
  { label: 'Groceries', value: 'groceries' },
];

const TruckIcon = () => (
  <svg className="trust-badge-icon" viewBox="0 0 24 24">
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <path d="M16 8h4l3 5v3h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const ReturnIcon = () => (
  <svg className="trust-badge-icon" viewBox="0 0 24 24">
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 .49-3.5" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="trust-badge-icon" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const TagIcon = () => (
  <svg className="trust-badge-icon" viewBox="0 0 24 24">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

export default function Home() {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 10;

  useEffect(() => {
    async function fetchProducts() {
      const skip = (currentPage - 1) * limit;

      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );

      const data = await response.json();
      setProducts(data.products);
    }

    fetchProducts();
  }, [currentPage]);

  const filtered =
    activeFilter === 'all'
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <div className="home-page">
      <Navbar />
      <HeroBanner />
      <OfferBanner />
      <CategoryGrid />
      <CountdownTimer />

      <section className="products-section">
        <div className="products-section-header">
          <h2>Products</h2>
          <Link to="/home">View All</Link>
        </div>

        <div className="filter-tabs">
          {filters.map((f) => (
            <button
              key={f.value}
              className={`filter-tab${
                activeFilter === f.value ? ' active' : ''
              }`}
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          <span>Page {currentPage}</span>

          <button onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </button>
        </div>
      </section>

      <div className="promo-strip">
        <div className="promo-strip-inner">
          <img
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1400&q=80"
            alt="adiClub"
          />
          <div className="promo-strip-content">
            <h2>Join adiClub. Get More.</h2>
            <p>Earn points on every purchase.</p>
            <Link to="/about" className="promo-cta">
              Join Free
            </Link>
          </div>
        </div>
      </div>

      <div className="trust-badges">
        <div className="trust-badge">
          <TruckIcon />
          <h4>Free Shipping</h4>
        </div>

        <div className="trust-badge">
          <ReturnIcon />
          <h4>Easy Returns</h4>
        </div>

        <div className="trust-badge">
          <ShieldIcon />
          <h4>Secure Payments</h4>
        </div>

        <div className="trust-badge">
          <TagIcon />
          <h4>Authentic Products</h4>
        </div>
      </div>

      <Footer />
    </div>
  );
}
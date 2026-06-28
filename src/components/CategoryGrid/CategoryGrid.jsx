import { Link } from 'react-router-dom';
import { categories } from '../../data/products';
import './CategoryGrid.css';

export default function CategoryGrid() {
  return (
    <section className="catalog-wrapper">
      <header className="catalog-header">
        <h2 className="catalog-heading">Shop by Category</h2>

        <Link to="/home" className="catalog-view-link">
          View All
        </Link>
      </header>

      <div className="catalog-grid">
        {categories.map(({ id, image, title, subtitle }) => (
          <Link to="/home" key={id} className="catalog-card">
            <article className="catalog-card-inner">
              <img src={image} alt={title} loading="lazy" />

              <div className="catalog-shade"></div>

              <div className="catalog-info">
                <h3>{title}</h3>
                <p>{subtitle}</p>
                <div className="catalog-btn">Shop Now</div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
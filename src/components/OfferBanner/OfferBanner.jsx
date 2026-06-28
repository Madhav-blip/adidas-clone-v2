import { Link } from 'react-router-dom';
import './OfferBanner.css';

const promoStats = [
  ['FLAT 30% OFF', 'On all products'],
  ['+15% EXTRA', 'Orders above ₹4,999'],
  ['FREE SHIPPING', 'On orders above ₹999'],
  ['EASY RETURNS', '30-day return policy']
];

const promoCards = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=900&q=80',
    tag: "Men's Sale",
    heading: ['Up to 50%', 'Off'],
    cta: "Shop Men's",
    path: '/home'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80',
    tag: "Women's Sale",
    heading: ['Up to 50%', 'Off'],
    cta: "Shop Women's",
    path: '/home'
  }
];

function PromoCard({ card }) {
  return (
    <article className="promo-card">
      <img src={card.image} alt={card.heading.join(' ')} loading="lazy" />

      <div className="promo-overlay" />

      <div className="promo-copy">
        <p>{card.tag}</p>

        <h3>
          {card.heading.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h3>

        <Link to={card.path}>{card.cta}</Link>
      </div>
    </article>
  );
}

export default function OfferBanner() {
  return (
    <section className="offer-wrapper">
      <div className="stats-bar">
        {promoStats.map(([main, sub]) => (
          <div className="stat-box" key={main}>
            <strong>{main}</strong>
            <span>{sub}</span>
          </div>
        ))}
      </div>

      <div className="promo-grid">
        {promoCards.map((card) => (
          <PromoCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import adidasLogo from '../../assets/adidas-logo.png';
import { useCart } from '../../hooks/useCart';

const menuData = [
  { title: 'New & Trending', url: '/home' },
  {
    title: 'Men',
    items: ['Shoes', 'Clothing', 'Accessories', 'Sport']
  },
  {
    title: 'Women',
    items: ['Shoes', 'Clothing', 'Accessories', 'Sport']
  },
  {
    title: 'Kids',
    items: ['Boys', 'Girls', 'Infants']
  },
  {
    title: 'Originals',
    items: ['Samba', 'Gazelle', 'Stan Smith', 'Forum', 'Superstar']
  },
  {
    title: 'More',
    items: ['About Adidas', 'Sustainability', 'Gift Cards', 'Store Locator']
  },
  { title: 'Sale', url: '/home', sale: true }
];

function Logo() {
  return <img src={adidasLogo} alt="adidas" className="brand-logo" />;
}

function MenuItem({ item }) {
  if (!item.items) {
    return (
      <Link to={item.url} className={`menu-link ${item.sale ? 'sale' : ''}`}>
        {item.title}
      </Link>
    );
  }

  return (
    <div className="menu-block">
      <span className="menu-link">{item.title}</span>

      <ul className="dropdown-box">
        {item.items.map((entry) => (
          <li key={entry}>
            <Link to="/home">{entry}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const [drawer, setDrawer] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const { cart } = useCart();


  const submitSearch = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    navigate('/home');
  };

  return (
    <header className="header-shell">
      <div className="promo-strip">
        🎉 END OF SEASON SALE — FLAT 30% OFF + EXTRA 15%
      </div>

      <nav className="nav-shell">
        <Link to="/home">
          <Logo />
        </Link>

        <div className="desktop-menu">
          {menuData.map((item) => (
            <MenuItem item={item} key={item.title} />
          ))}
        </div>

        <div className="nav-tools">
          <form
            className={`search-box ${searchVisible ? 'expanded' : ''}`}
            onSubmit={submitSearch}
          >
            <input
              type="text"
              placeholder="Search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setSearchVisible((v) => !v)}
            >
              ⌕
            </button>
          </form>

          <button>👤</button>
          <button>♡</button>
          <Link to="/cart" className="cart-btn">
  👜
  <span>{cart.length}</span>
</Link>
          <button
            className="menu-toggle"
            onClick={() => setDrawer(!drawer)}
          >
            ☰
          </button>
        </div>
      </nav>

      <aside className={`mobile-drawer ${drawer ? 'show' : ''}`}>
        {menuData.map((item) => (
          <Link
            key={item.title}
            to="/home"
            className={`drawer-link ${item.sale ? 'sale' : ''}`}
            onClick={() => setDrawer(false)}
          >
            {item.title}
          </Link>
        ))}
      </aside>
    </header>
  );
}
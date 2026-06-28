import './Footer.css';
import adidasLogo from '../../assets/adidas-logo.png';

const Logo = () => (
  <img
    src={adidasLogo}
    alt="adidas"
    style={{ height: 44, width: 'auto', filter: 'invert(1)' }}
  />
);

const footerData = [
  {
    title: 'Help',
    items: ['Help & FAQs', 'Order Tracking', 'Returns & Refunds', 'Size Guide', 'Store Locator', 'Contact Us']
  },
  {
    title: 'Company',
    items: ['About Adidas', 'Careers', 'Press', 'Sustainability', 'Investor Relations']
  },
  {
    title: 'Explore',
    items: ['New Arrivals', 'Bestsellers', 'adidas Originals', 'Sale', 'Gift Cards', 'Customize']
  },
  {
    title: 'Account',
    items: ['Sign In', 'Create Account', 'adiClub', 'My Orders', 'My Wishlist']
  }
];

const socials = ['Instagram', 'Twitter', 'Facebook', 'YouTube'];

function FooterColumn({ title, items }) {
  return (
    <div className="foot-column">
      <h4>{title}</h4>
      {items.map(item => (
        <a href="#" key={item}>{item}</a>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <section className="club-banner">
        <div>
          <h3>Sign Up For adiClub</h3>
          <p>Get early access, exclusive offers and special discounts.</p>
        </div>

        <form
          className="club-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <input type="email" placeholder="Enter your email address" />
          <button>Join</button>
        </form>
      </section>

      <nav className="footer-grid">
        {footerData.map(section => (
          <FooterColumn
            key={section.title}
            title={section.title}
            items={section.items}
          />
        ))}
      </nav>

      <section className="footer-panels">
        <aside className="footer-box">
          <p>Follow Us</p>
          <div className="icon-row">
            {socials.map(icon => (
              <button key={icon}>{icon[0]}</button>
            ))}
          </div>
        </aside>

        <aside className="footer-box">
          <p>Download the App</p>
          <div className="store-buttons">
            <span>App Store</span>
            <span>Google Play</span>
          </div>
        </aside>
      </section>

      <section className="footer-end">
        <div className="brand-block">
          <Logo />
          <span>adidas India</span>
        </div>

        <p>© 2025 adidas India Marketing Pvt. Ltd.</p>

        <div className="legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Cookie Settings</a>
          <a href="#">Accessibility</a>
        </div>
      </section>
    </footer>
  );
}
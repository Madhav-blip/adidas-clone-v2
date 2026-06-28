import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './About.css';

const values = [
  {
    title: 'Performance',
    description: 'Every product is engineered to help athletes perform at their peak.',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=700&q=80',
  },
  {
    title: 'Sustainability',
    description: 'Committed to ending plastic waste by making products from recycled materials.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=700&q=80',
  },
  {
    title: 'Culture',
    description: 'Sport and street culture — we connect with youth culture and communities worldwide.',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961a28c?w=700&q=80',
  },
];

const timeline = [
  { year: '1949', title: 'adidas Founded', desc: 'Adolf Dassler registered adidas AG in Herzogenaurach, Germany. The iconic three-stripe logo was born.' },
  { year: '1954', title: 'First World Cup Win', desc: 'The West Germany national team wore adidas boots and won the FIFA World Cup, putting adidas on the global map.' },
  { year: '1969', title: 'Superstar Launched', desc: 'The adidas Superstar basketball shoe debuted and became one of the best-selling sneakers in history.' },
  { year: '1984', title: 'Stan Smith', desc: 'The Stan Smith became the first tennis shoe to bear an athlete\'s name, selling over 70 million pairs.' },
  { year: '2015', title: 'Boost Technology', desc: 'Boost cushioning technology revolutionized footwear comfort and energy return for runners worldwide.' },
  { year: '2023', title: 'Samba Renaissance', desc: 'The adidas Samba became the most coveted sneaker in the world, dominating global street culture.' },
];

export default function About() {
  return (
    <div className="about-page">
      <Navbar />

      {/* Hero */}
      <section className="about-hero">
        <img
          src="https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=1600&q=80"
          alt="adidas athletes"
          loading="eager"
        />
        <div className="about-hero-content">
          <p>Since 1949</p>
          <h1>Impossible Is Nothing</h1>
          <span>adidas is the largest sportswear manufacturer in Europe and the second largest in the world. We believe sport has the power to change lives.</span>
        </div>
      </section>

      {/* Intro */}
      <section className="about-intro">
        <h2>Our Story</h2>
        <p>
          Founded in 1949 by Adolf Dassler, adidas has been creating the best sports equipment for over 75 years.
          From the football pitch to the basketball court, from the running track to the streets —
          adidas empowers athletes at every level. Today, adidas sells products in virtually every country
          in the world and operates more than 2,400 retail stores globally.
        </p>
      </section>

      {/* Stats */}
      <div className="about-stats">
        <div className="stat-card">
          <p className="stat-number">75+</p>
          <p className="stat-label">Years of Innovation</p>
        </div>
        <div className="stat-card">
          <p className="stat-number">160+</p>
          <p className="stat-label">Countries Worldwide</p>
        </div>
        <div className="stat-card">
          <p className="stat-number">59,000+</p>
          <p className="stat-label">Employees Globally</p>
        </div>
        <div className="stat-card">
          <p className="stat-number">2,400+</p>
          <p className="stat-label">Retail Stores</p>
        </div>
      </div>

      {/* Values */}
      <section className="about-values">
        <h2>What We Stand For</h2>
        <div className="values-grid">
          {values.map((v) => (
            <div className="value-card" key={v.title}>
              <img src={v.image} alt={v.title} loading="lazy" />
              <div className="value-card-overlay" />
              <div className="value-card-content">
                <h3>{v.title}</h3>
                <p>{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline">
        <h2>Our Legacy</h2>
        <div className="timeline-items">
          {timeline.map((item) => (
            <div className="timeline-item" key={item.year}>
              <p className="timeline-year">{item.year}</p>
              <p className="timeline-title">{item.title}</p>
              <p className="timeline-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Join the Movement</h2>
        <p>Become part of the adidas family. Shop the latest drops and exclusive sales.</p>
        <Link to="/home" className="about-cta-btn">Shop Now</Link>
      </section>

      <Footer />
    </div>
  );
}

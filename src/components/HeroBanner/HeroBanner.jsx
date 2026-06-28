import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './HeroBanner.css';

const bannerItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961a28c?w=1600&q=85',
    tag: 'End of Season Sale',
    heading: ['Flat 30% Off', 'Everything'],
    desc: 'Shop the biggest sale of the season. Shoes, clothing and accessories at unbeatable prices.',
    cta1: 'Shop Now',
    cta2: 'Explore Sale',
    path1: '/home',
    path2: '/home',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=85',
    tag: 'New Collection',
    heading: ['Ultraboost', '23'],
    desc: 'Engineered for incredible energy return. Feel every run like never before.',
    cta1: 'Shop Ultraboost',
    cta2: 'Learn More',
    path1: '/product/ultraboost-23',
    path2: '/product/ultraboost-23',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=85',
    tag: "Women's Sale",
    heading: ['Her Game.', 'Her Rules.'],
    desc: 'Performance and style for every woman. Up to 50% off on selected styles.',
    cta1: "Shop Women's",
    cta2: 'View All',
    path1: '/home',
    path2: '/home',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1600&q=85',
    tag: 'adidas Originals',
    heading: ['Icons', 'Never Die.'],
    desc: 'Stan Smith. Samba. Superstar. The classics that defined street culture.',
    cta1: 'Shop Originals',
    cta2: 'Discover',
    path1: '/product/stan-smith',
    path2: '/home',
  }
];

export default function HeroBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const autoSlide = setTimeout(() => {
      setIndex((value) => (value + 1) % bannerItems.length);
    }, 5000);

    return () => clearTimeout(autoSlide);
  }, [index]);

  const activeSlide = useMemo(() => bannerItems[index], [index]);

  const moveSlide = (direction) => {
    setIndex((prev) => {
      const next = prev + direction;
      if (next < 0) return bannerItems.length - 1;
      return next % bannerItems.length;
    });
  };

  return (
    <section className="banner-shell">
      {bannerItems.map((item, i) => (
        <div
          key={item.id}
          className="banner-frame"
          data-visible={i === index}
        >
          <img src={item.image} alt={item.heading.join(' ')} />
          <div className="banner-layer" />

          <div className="banner-copy">
            <p>{item.tag}</p>

            <h1>
              {item.heading.map(line => (
                <span key={line}>{line}</span>
              ))}
            </h1>

            <h4>{item.desc}</h4>

            <div className="banner-actions">
              <Link to={item.path1}>{item.cta1}</Link>
              <Link to={item.path2} className="outline-btn">
                {item.cta2}
              </Link>
            </div>
          </div>
        </div>
      ))}

      <button className="nav-arrow left-nav" onClick={() => moveSlide(-1)}>
        ‹
      </button>

      <button className="nav-arrow right-nav" onClick={() => moveSlide(1)}>
        ›
      </button>

      <div className="indicator-row">
        {bannerItems.map((_, i) => (
          <button
            key={i}
            className={i === index ? 'selected' : ''}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../data/products';
import './Product.css';

function renderStars(rating) {
  const full = Math.floor(rating);
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={`star${i >= full ? ' empty' : ''}`}>★</span>
  ));
}

function formatPrice(price) {
  return '₹' + price.toLocaleString('en-IN');
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="accordion-item">
      <button className={`accordion-trigger${open ? ' open' : ''}`} onClick={() => setOpen(!open)}>
        {title}
        <PlusIcon />
      </button>
      <div className={`accordion-body${open ? ' open' : ''}`}>{children}</div>
    </div>
  );
}

export default function Product() {
  const { product_id } = useParams();
  const product = products.find((p) => p.id === product_id);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const [mainImg, setMainImg] = useState(0);

  if (!product) {
    return (
      <div className="product-page">
        <Navbar />
        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist or may have been removed.</p>
          <Link to="/home">Back to Shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const galleryImages = [product.image, product.hoverImage, product.image, product.hoverImage];

  function handleAddToBag() {
    if (!selectedSize) {
      alert('Please select a size first.');
      return;
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const related = products.filter((p) => p.id !== product.id && p.tag === product.tag).slice(0, 4);
  const fallbackRelated = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="product-page">
      <Navbar />

      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/home">Home</Link>
        <span>/</span>
        <Link to="/home">{product.tag}</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      {/* Main layout */}
      <div className="product-detail-container">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="product-thumbnails">
            {galleryImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.name} view ${i + 1}`}
                className={`product-thumb${mainImg === i ? ' selected' : ''}`}
                onClick={() => setMainImg(i)}
                loading="lazy"
              />
            ))}
          </div>

          <div className="product-main-image">
            {product.badge && (
              <span className="product-main-badge">{product.badge}</span>
            )}
            <img src={galleryImages[mainImg]} alt={product.name} />
          </div>
        </div>

        {/* Info Panel */}
        <div className="product-info-panel">
          <p className="product-info-category">{product.category}</p>
          <h1 className="product-info-name">{product.name}</h1>

          {/* Rating */}
          <div className="product-rating-row">
            <div className="product-stars">{renderStars(product.rating)}</div>
            <span>{product.rating} ({product.reviews.toLocaleString()} Reviews)</span>
          </div>

          {/* Price */}
          <div className="product-price-block">
            <span className="product-price-current">{formatPrice(product.price)}</span>
            <span className="product-price-original">{formatPrice(product.originalPrice)}</span>
            <span className="product-price-badge">{product.discount}% Off</span>
          </div>

          {/* Color */}
          <div className="product-color-section">
            <label>Color: {product.colors.length} Color{product.colors.length > 1 ? 's' : ''}</label>
            <div className="product-color-swatches">
              {product.colors.map((color, i) => (
                <span
                  key={i}
                  className={`detail-swatch${selectedColorIdx === i ? ' selected' : ''}${color === '#fff' || color === '#ffffff' ? ' white-swatch' : ''}`}
                  style={{ backgroundColor: color, border: color === '#fff' ? '2.5px solid #ccc' : undefined }}
                  onClick={() => setSelectedColorIdx(i)}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="product-size-section">
            <div className="size-section-header">
              <label>
                Size{selectedSize ? `: UK ${selectedSize}` : ' (Select a size)'}
              </label>
              <button className="size-guide-link">Size Guide</button>
            </div>
            <div className="product-size-grid">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn${selectedSize === size ? ' selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  UK {size}
                </button>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="product-cta-group">
            <button
              className={`btn-add-to-bag${added ? ' added' : ''}`}
              onClick={handleAddToBag}
            >
              {added ? '✓ Added to Bag!' : 'Add to Bag'}
            </button>
            <button className="btn-wishlist">
              <HeartIcon />
              Add to Wishlist
            </button>
          </div>

          {/* Accordion */}
          <div className="product-accordion">
            <AccordionItem title="Product Description">
              <p>{product.description}</p>
            </AccordionItem>
            <AccordionItem title="Key Features">
              <ul style={{ paddingLeft: '18px', marginTop: '4px' }}>
                <li>Premium materials for lasting comfort and durability</li>
                <li>Engineered for high performance activity</li>
                <li>Responsive cushioning system</li>
                <li>Breathable upper construction</li>
                <li>Durable rubber outsole for traction</li>
              </ul>
            </AccordionItem>
            <AccordionItem title="Delivery & Returns">
              <p>Free standard delivery on orders above ₹999. Express delivery available.</p>
              <p style={{ marginTop: '8px' }}>Free returns within 30 days of purchase. Items must be unworn and in original packaging.</p>
            </AccordionItem>
            <AccordionItem title="Size & Fit">
              <p>This product fits true to size. We recommend ordering your regular size. Refer to our size guide for detailed measurements.</p>
            </AccordionItem>
          </div>
        </div>
      </div>

      {/* Related products */}
      <section className="related-section">
        <h2>You May Also Like</h2>
        <div className="related-grid">
          {(related.length >= 4 ? related : fallbackRelated).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

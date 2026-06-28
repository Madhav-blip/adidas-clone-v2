import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CountdownTimer.css';

const formatValue = (value) => value.toString().padStart(2, '0');

const calculateRemaining = (deadline) => {
  const remaining = deadline.getTime() - Date.now();

  if (remaining <= 0) {
    return [0, 0, 0, 0];
  }

  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;

  return [
    Math.floor(remaining / day),
    Math.floor((remaining % day) / hour),
    Math.floor((remaining % hour) / minute),
    Math.floor((remaining % minute) / 1000),
  ];
};

export default function CountdownTimer() {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 3);
  endDate.setHours(23, 59, 59, 0);

  const [timer, setTimer] = useState(() =>
    calculateRemaining(endDate)
  );

  useEffect(() => {
    const timerId = setTimeout(function updateClock() {
      setTimer(calculateRemaining(endDate));
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timer]);

  const labels = ['Days', 'Hours', 'Minutes', 'Seconds'];

  return (
    <section className="promo-banner">
      <small className="promo-label">Limited Time Offer</small>

      <h2 className="promo-title">
        Sale Ends In <em>Hurry Up!</em>
      </h2>

      <div className="promo-clock">
        {labels.map((label, index) => (
          <div className="clock-block" key={label}>
            <div className="clock-value">{formatValue(timer[index])}</div>
            <span className="clock-text">{label}</span>
          </div>
        ))}
      </div>

      <Link to="/home" className="promo-button">
        Shop the Sale
      </Link>
    </section>
  );
}
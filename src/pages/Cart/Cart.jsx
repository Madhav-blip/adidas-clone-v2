import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useCart } from "../../hooks/useCart";

export default function Cart() {
  const { cart, setCart } = useCart();

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div style={{ padding: "40px" }}>
        <h1>Shopping Cart</h1>

        {cart.length === 0 ? (
          <h2>Your cart is empty</h2>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid gray",
                padding: "20px",
                marginBottom: "20px"
              }}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                width="120"
              />

              <h3>{item.title}</h3>

              <p>₹{Math.round(item.price * 85)}</p>

              <button onClick={() => decreaseQuantity(item.id)}>
                -
              </button>

              <span style={{ margin: "0 15px" }}>
                {item.quantity}
              </span>

              <button onClick={() => increaseQuantity(item.id)}>
                +
              </button>
            </div>
          ))
        )}

        <h2>Total: ₹{Math.round(totalPrice * 85)}</h2>
      </div>

      <Footer />
    </>
  );
}
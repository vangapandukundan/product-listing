import { useState, useEffect } from "react";
import { products, categories } from "./data/products";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import SearchBar from "./components/SearchBar";
import ProductGrid from "./components/ProductGrid";
import CartDrawer from "./components/CartDrawer";

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // load saved cart from localStorage once on first load
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("Product Listing_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (err) {
      window.alert("Could not load your saved cart. Starting with an empty cart.");
      console.error(err);
    }
  }, []);

  // keep localStorage in sync whenever cart changes
  useEffect(() => {
    localStorage.setItem("Product Listing_cart", JSON.stringify(cart));
  }, [cart]);

  // sanity check that products actually loaded
  useEffect(() => {
    if (!products || products.length === 0) {
      window.alert("Error: products could not be loaded. Please check your internet connection and try again.");
    }
  }, []);

  function addToCart(product) {
    if (!product || !product.id) {
      window.alert("Something went wrong adding this product. Please try again.");
      return;
    }

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);

      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...prevCart, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  function changeQty(id, delta) {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  }

  function checkout() {
    if (cart.length === 0) return;
    setCart([]);
    setIsCartOpen(false);
    alert("Order placed successfully! Thank you for shopping with Product Listing.");
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // category filter, then search filter, chained together
  const filteredProducts = products
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="app">
      <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />

      <main className="main-content">
        <div className="hero">
          <h2>Discover Products You'll Love</h2>
          <p>Browse our collection across electronics, fashion, shoes and accessories</p>
        </div>

        <div className="controls">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
          <SearchBar searchQuery={searchQuery} onSearch={setSearchQuery} />
        </div>

        <div className="results-info">
          Showing <strong>{filteredProducts.length}</strong> of {products.length} products
        </div>

        <ProductGrid products={filteredProducts} cart={cart} onAddToCart={addToCart} />
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onRemove={removeFromCart}
        onChangeQty={changeQty}
        onCheckout={checkout}
      />
    </div>
  );
}

export default App;

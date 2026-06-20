import ProductCard from "./ProductCard";

function ProductGrid({ products, cart, onAddToCart }) {
  if (products.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-icon">🔍</div>
        <h3>No products found</h3>
        <p>Try a different category or search term</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product, index) => {
        const alreadyInCart = cart.some((item) => item.id === product.id);
        return (
          // staggering the fade-in animation slightly per card looks nicer
          // than everything popping in at once
          <div
            key={product.id}
            className="card-enter"
            style={{ animationDelay: `${(index % 12) * 40}ms` }}
          >
            <ProductCard
              product={product}
              isInCart={alreadyInCart}
              onAddToCart={onAddToCart}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ProductGrid;
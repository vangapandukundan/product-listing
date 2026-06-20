// top navbar, logo on the left, cart button on the right kept it sticky so it stays visible while scrolling through products
function Header({ cartCount, onCartClick }) {
  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="logo">
          product <span>Listing</span>
        </h1>

        <button className="cart-btn" onClick={onCartClick}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span>Cart</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}

export default Header;
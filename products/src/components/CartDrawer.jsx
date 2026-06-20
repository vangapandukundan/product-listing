function CartDrawer({ isOpen, cart, onClose, onRemove, onChangeQty, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}

      <div className={"cart-drawer" + (isOpen ? " open" : "")}>
        <div className="drawer-header">
          <h2>Your Cart {itemCount > 0 && `(${itemCount})`}</h2>
          <button className="close-cart" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <p>Your cart is empty</p>
              <span>Add some products to get started</span>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="ci-img" />

                <div className="ci-info">
                  <div className="ci-name">{item.name}</div>
                  <div className="ci-price">₹{item.price.toLocaleString("en-IN")}</div>

                  <div className="ci-qty">
                    <button className="qty-btn" onClick={() => onChangeQty(item.id, -1)}>
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button className="qty-btn" onClick={() => onChangeQty(item.id, 1)}>
                      +
                    </button>
                  </div>
                </div>

                <button className="remove-btn" onClick={() => onRemove(item.id)}>
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <button className="checkout-btn" onClick={onCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;
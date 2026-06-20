import { useState } from "react";

// single product card
// handles its own image load error so a broken image doesn't break the layout
function ProductCard({ product, isInCart, onAddToCart }) {
  const [imgFailed, setImgFailed] = useState(false);

  const formattedPrice = "₹" + product.price.toLocaleString("en-IN");

  return (
    <div className="card">
      <div className="card-img-wrap">
        {!imgFailed ? (
          <img
            src={product.image}
            alt={product.name}
            className="card-img"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          // fallback if the image url ever fails to load
          <div className="card-img-fallback">{product.category[0]}</div>
        )}

        <span className="card-cat-tag">{product.category}</span>
      </div>

      <div className="card-body">
        <div className="card-name">{product.name}</div>

        <div className="card-rating">
          <span className="star">★</span>
          {product.rating}
        </div>

        <div className="card-bottom">
          <div className="card-price">{formattedPrice}</div>

          <button
            className={"add-btn" + (isInCart ? " added" : "")}
            onClick={() => onAddToCart(product)}
          >
            {isInCart ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Added
              </>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
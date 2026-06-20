// row of pill buttons for filtering by category
function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    <div className="categories">
      {categories.map((cat) => (
        <button
          key={cat}
          className={"cat-btn" + (cat === activeCategory ? " active" : "")}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
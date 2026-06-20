// search input with icon, clears itself with the x button when there's text
function SearchBar({ searchQuery, onSearch }) {
  return (
    <div className="search-wrap">
      <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>

      <input
        type="text"
        placeholder="Search for products..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
      />

      {searchQuery && (
        <button className="search-clear" onClick={() => onSearch("")}>
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
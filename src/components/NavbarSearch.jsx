import "../Styles/NavbarSearch.css";

export default function NavbarSearch() {
  return (
    <div>
      <nav>
        <div className="menu-icon">
          <span className="fas fa-bars" />
        </div>
        <div className="logo">Petopia</div>
        <div className="nav-items">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Toys/Accessories</a>
          </li>
          <li>
            <a href="#">Medicine</a>
          </li>
          <li>
            <a href="#">Value Packs</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </div>
        <div className="search-icon">
          <span className="fas fa-search" />
        </div>
        <div className="cancel-icon">
          <span className="fas fa-times" />
        </div>
        <form action="#">
          <input
            type="search"
            className="search-data"
            placeholder="Search"
            required=""
          />
          <button type="submit" className="fas fa-search" />
        </form>
      </nav>
    </div>
  );
}

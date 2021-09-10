import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <Link to="/" className="logo">
                Roullete
              </Link>
              <ul className="nav">
                <li className="scroll-to-section">
                  <Link to="/" className="menu-item">
                    Home
                  </Link>
                </li>
                <li className="scroll-to-section">
                  <Link to="/answers" className="menu-item">
                    Answers
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

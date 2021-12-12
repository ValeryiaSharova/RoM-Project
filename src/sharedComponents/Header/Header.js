import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'proptypes';

const Header = ({ isMarks }) => {
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
                {isMarks ? (
                  <li className="scroll-to-section">
                    <Link to="/marks" className="menu-item">
                      Marks
                    </Link>
                  </li>
                ) : null}

                <li className="scroll-to-section">
                  <Link to="/marks" className="menu-item">
                    Sign in / Sing up
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

Header.propTypes = {
  isMarks: PropTypes.bool.isRequired,
};

export default Header;

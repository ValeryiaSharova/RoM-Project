/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';

import PropTypes from 'proptypes';

const store = require('store');

const MarksPage = props => {
  const { calcMarks, marks } = props;

  useEffect(() => {
    if (!store.get('marks')) {
      calcMarks();
    }
  }, [calcMarks, marks]);

  const tempmarks = store.get('marks');

  return (
    <div>
      <div className="welcome-area" id="welcome">
        <div className="header-text">
          <div className="container">
            <div className="row">
              <div className="left-text">
                <h1>
                  Your <em>MARKS</em>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="section" id="about">
        <div className="container">
          <div className="row">
            {tempmarks ? (
              Object.keys(tempmarks).map(person => (
                <div className="col-lg-4" key={person}>
                  <div className="features-item">
                    <div className="features-icon features-em">
                      <h4>{person}</h4>
                      <h4>
                        <div>
                          <div>{tempmarks[person]}</div>
                        </div>
                      </h4>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>no data, please reset a page</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

MarksPage.propTypes = {
  calcMarks: PropTypes.func.isRequired,
  marks: PropTypes.object.isRequired,
};

export default MarksPage;

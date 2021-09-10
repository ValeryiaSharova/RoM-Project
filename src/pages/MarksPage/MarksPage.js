/* eslint-disable no-nested-ternary */
import React from 'react';

const MarksPage = () => {
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
            <div className="col-lg-4">
              <div className="features-item">
                <div className="features-icon features-em">
                  <h4>person</h4>
                  <h4>
                    <div>
                      <div>marks</div>
                    </div>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarksPage;

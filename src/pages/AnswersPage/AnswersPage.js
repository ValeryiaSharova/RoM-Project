import React from 'react';
import icon from '../../images/stars.png';
import good from '../../images/heart.png';
import bad from '../../images/skull.png';

const AnswersPage = () => {
  return (
    <div>
      <div className="welcome-area" id="welcome">
        <div className="header-text">
          <div className="container">
            <div className="row">
              <div className="left-text">
                <h1>
                  Your <em>ANSWERS</em>
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
                  <h2>index </h2>
                  <img src={icon} alt="Person" />
                  <h4>person</h4>
                  <h4>
                    <div>
                      <div className="features-allcall">All : markData</div>
                      <img src={good} alt="Good" className="features-img" /> x markData
                    </div>
                    <div>
                      <div className="features-allcall">All : markData</div>
                      <em>No answer :(</em>
                    </div>
                    <div>
                      <div className="features-allcall">All : markData</div>
                      <img src={bad} alt="Bad" className="features-img" /> x markData
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

export default AnswersPage;

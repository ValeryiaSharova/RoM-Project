import React from 'react';

import PropTypes from 'proptypes';

const MarksPage = props => {
  const { calcMarks, deleteMarks, marks, resetMarks } = props;

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
      <div className="item service-item">
        <div>
          <button className="main-button-slider" type="button" onClick={calcMarks}>
            Show marks
          </button>
          {marks ? (
            <button className="main-button-slider" type="button" onClick={deleteMarks}>
              Delete marks
            </button>
          ) : null}
        </div>
      </div>

      <hr />
      <section className="section" id="about">
        <div className="container">
          <div className="row">
            {marks ? (
              Object.keys(marks).map(person => (
                <div className="col-lg-4" key={person}>
                  <div className="features-item">
                    <div className="features-icon features-em">
                      <h4>{person}</h4>
                      <h4>
                        <div>
                          <div>{marks[person]}</div>
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
        {marks ? (
          <div className="item service-item">
            <div>
              <button className="main-button-slider" type="button" onClick={resetMarks}>
                Reset marks
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
};

MarksPage.propTypes = {
  calcMarks: PropTypes.func.isRequired,
  deleteMarks: PropTypes.func.isRequired,
  marks: PropTypes.object.isRequired,
  resetMarks: PropTypes.object.isRequired,
};

export default MarksPage;

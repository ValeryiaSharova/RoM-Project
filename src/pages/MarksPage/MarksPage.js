import React from 'react';
import PropTypes from 'proptypes';
import { useHistory } from 'react-router-dom';

const MarksPage = props => {
  const { calcMarks, deleteMarks, marks, resetMarks } = props;

  const history = useHistory();

  const handleReset = () => {
    resetMarks();
    history.replace('/');
  };

  return (
    <div>
      <div className="welcome-area" id="welcome">
        <div className="header-text">
          <div className="container">
            <div className="row">
              <div className="left-text">
                <h1>
                  Ваши <em>ОЦЕНКИ</em>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="item service-item">
        <div>
          <button className="main-button-slider" type="button" onClick={calcMarks}>
            Показать оценки
          </button>
          {marks ? (
            <button className="main-button-slider" type="button" onClick={deleteMarks}>
              Скрыть оценки
            </button>
          ) : null}
        </div>
      </div>
      <section className="section" id="about">
        <div className="container">
          <div className="row">
            {marks
              ? Object.keys(marks).map(person => (
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
              : null}
          </div>
        </div>
        {marks ? (
          <div className="item service-item">
            <div>
              <button className="main-button-slider" type="button" onClick={handleReset}>
                Очистить оценки
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

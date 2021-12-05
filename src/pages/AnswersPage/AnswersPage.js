/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import PropTypes from 'proptypes';
import { ModalConsumer } from '../../context/ModalContext';
import ModalElement from './Components/Modal';
import icon from '../../images/stars.png';
import good from '../../images/heart.png';
import bad from '../../images/skull.png';

const store = require('store');

const AnswersPage = props => {
  const { getStartAnswerData, saveDataAnswer, getSaveDataAnswer } = props;
  const markData = store.get('test');

  useEffect(() => {
    if (!store.get('test')) {
      getStartAnswerData();
    }
  }, [getStartAnswerData]);

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
                <div className="item service-item">
                  <ModalConsumer>
                    {({ showModal }) => (
                      <button
                        className="main-button-slider"
                        type="button"
                        onClick={() => showModal(ModalElement, { saveDataAnswer })}
                      >
                        Save marks
                      </button>
                    )}
                  </ModalConsumer>
                  <button className="main-button-slider" type="button" onClick={getSaveDataAnswer}>
                    Get save marks
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="section" id="about">
        <div className="container">
          <div className="row">
            {markData ? (
              Object.keys(markData).map((person, index) => (
                <div className="col-lg-4" key={person}>
                  <div className="features-item">
                    <div className="features-icon features-em">
                      <h2>{index + 1}</h2>
                      <img src={icon} alt="Person" />
                      <h4>{person}</h4>
                      <h4>
                        {markData[person].mark > 0 ? (
                          <div>
                            <div className="features-allcall">All : {markData[person].all}</div>
                            <img src={good} alt="Good" className="features-img" /> x{' '}
                            {markData[person].mark}
                          </div>
                        ) : markData[person].mark === 0 ? (
                          <div>
                            <div className="features-allcall">All : {markData[person].all}</div>
                            <em>No answer :(</em>
                          </div>
                        ) : (
                          <div>
                            <div className="features-allcall">All : {markData[person].all}</div>
                            <img src={bad} alt="Bad" className="features-img" /> x{' '}
                            {markData[person].mark * -1}
                          </div>
                        )}
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

AnswersPage.propTypes = {
  getStartAnswerData: PropTypes.func.isRequired,
  saveDataAnswer: PropTypes.func.isRequired,
  getSaveDataAnswer: PropTypes.func.isRequired,
};

export default AnswersPage;

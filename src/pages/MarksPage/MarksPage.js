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
      <h1 className="title">
        Ваши <em>ОЦЕНКИ</em>
      </h1>

      <div className="group-button">
        <button className="group-button__button" type="button" onClick={calcMarks}>
          Показать оценки
        </button>
        {marks ? (
          <button className="group-button__button" type="button" onClick={deleteMarks}>
            Скрыть оценки
          </button>
        ) : null}
      </div>

      <div className="container">
        <table className="marks">
          {marks
            ? Object.keys(marks).map(person => (
                <tr className="marks-item" key={person}>
                  <td>{person}</td>
                  <td>{marks[person]}</td>
                </tr>
              ))
            : null}
        </table>
      </div>

      {marks ? (
        <div className="group-button">
          <button className="group-button__button" type="button" onClick={handleReset}>
            Очистить оценки
          </button>
        </div>
      ) : null}
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
/*
 <div className="marks__item" key={person}>
                <h4>{person}</h4>
                <p>{marks[person]}</p>
              </div>
              */

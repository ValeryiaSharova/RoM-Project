import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getMarks, resetMarks, calcMarks, deleteMarks } from '../../redux/people';

const MarksPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const marks = useSelector(getMarks());

  const handleReset = () => {
    dispatch(resetMarks());
    history.replace('/');
  };

  return (
    <div>
      <h1 className="title">
        Ваши <em>ОЦЕНКИ</em>
      </h1>

      <div className="group-button">
        <button className="group-button__button" type="button" onClick={dispatch(calcMarks)}>
          Показать оценки
        </button>
        {marks ? (
          <button className="group-button__button" type="button" onClick={dispatch(deleteMarks)}>
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

export default MarksPage;

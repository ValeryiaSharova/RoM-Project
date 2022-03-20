import React from 'react';
import PropTypes from 'proptypes';
import { useHistory } from 'react-router-dom';

const MarksPage = props => {
  const { calcMarks, marks, resetMarks, isAdmin } = props;

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
      {!marks && (
        <div className="group-button">
          <button className="group-button__button" type="button" onClick={calcMarks}>
            Показать оценки
          </button>
        </div>
      )}

      <div className="container">
        <table className="marks">
          <tbody>
            {marks
              ? Object.keys(marks).map(person => (
                  <tr className="marks-item" key={person}>
                    <td>{person}</td>
                    <td>{marks[person]}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>

      {marks && isAdmin ? (
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
  marks: PropTypes.object,
  resetMarks: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

MarksPage.defaultProps = {
  marks: null,
};

export default MarksPage;

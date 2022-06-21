import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'proptypes';

const store = require('store');

const ModalElement = props => {
  const {
    onRequestClose,
    changeStatus,
    swapSubject,
    fetchQuestions,
    getSaveDataAnswer,
    isAdmin,
    checkAnswer,
  } = props;
  const handleSubmit = e => {
    e.preventDefault();
    if (e.target[0].value === process.env.REACT_APP_PASSWORD) {
      changeStatus();
      onRequestClose();
    }
  };
  const handleSwap = async () => {
    swapSubject();
    fetchQuestions(store.get('subject'));
    await getSaveDataAnswer(store.get('subject'));
    checkAnswer();
  };
  const handleChange = () => {
    changeStatus();
    onRequestClose();
  };
  return (
    <Modal show onHide={onRequestClose} centered>
      <h1 className="title">
        <em>НАСТРОЙКИ</em>
      </h1>
      <Modal.Body>
        {!isAdmin ? (
          <Form onSubmit={handleSubmit}>
            <Form.Label>Введите пароль администратора</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            <Button type="submit" className="modal-button">
              Подтвердить
            </Button>
          </Form>
        ) : (
          <button className="group-button__button" type="button" onClick={handleChange}>
            Выйти
          </button>
        )}

        <button className="group-button__button" type="button" onClick={handleSwap}>
          Сменить предмет
        </button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onRequestClose} className="modal-button">
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ModalElement.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  swapSubject: PropTypes.func.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  getSaveDataAnswer: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  checkAnswer: PropTypes.func.isRequired,
};

export default ModalElement;

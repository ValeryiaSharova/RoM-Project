import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'proptypes';
import { useDispatch } from 'react-redux';

const ModalElement = props => {
  const dispatch = useDispatch();
  const { onRequestClose, saveDataAnswer } = props;
  const handleSubmit = e => {
    e.preventDefault();
    if (e.target[0].value === 'ybrnjytpyftn!') {
      dispatch(saveDataAnswer());
      onRequestClose();
    }
  };
  return (
    <Modal show onHide={onRequestClose} centered>
      <Modal.Header>
        <Modal.Title>Подтверждение действия</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Label>Введите пароль</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          <Button type="submit" className="modal-button">
            Подтвердить
          </Button>
        </Form>
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
  saveDataAnswer: PropTypes.func.isRequired,
};

export default ModalElement;

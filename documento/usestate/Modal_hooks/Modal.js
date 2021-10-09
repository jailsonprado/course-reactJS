import React from 'react';

const Modal = ({ modal, setModal }) => {
  if (modal)
    return (
      <div>
        Esse eh um modal.{' '}
        <button onClick={() => setModal(false)}>Fechar</button>
      </div>
    );
  else {
    return null;
  }
};

export default Modal;

import PropTypes from 'prop-types';

import { useEffect } from 'react';
import css from '../styles.module.css';
export const Modal = ({ closeModal, modalImage }) => {
  useEffect(() => {
    window.addEventListener('keydown', hendleEscapeClick);
    return () => {
      window.removeEventListener('keydown', hendleEscapeClick);
    };
  });

  const hendleEscapeClick = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };

  const hendleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  return (
    <div className={css.Overlay} onClick={hendleBackdropClick}>
      <div className={css.Modal}>
        <img id={modalImage.id} src={modalImage.img} alt={modalImage.tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  modalImage: PropTypes.object,
  closeModal: PropTypes.func,
};

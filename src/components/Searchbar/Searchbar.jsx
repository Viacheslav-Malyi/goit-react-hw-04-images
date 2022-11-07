import PropTypes from 'prop-types';

import css from '../styles.module.css';
import { ImSearch } from 'react-icons/im';
import { useState } from 'react';
export const Searchbar = ({ onSubmit }) => {
  const [inputParam, setInputParam] = useState('');

  const hendleChange = event => {
    setInputParam(event.currentTarget.value.toLowerCase());
  };

  const hendleSubmit = event => {
    event.preventDefault();
    if (inputParam.trim() === '') {
      return;
    }
    onSubmit(inputParam);
    setInputParam('');
  };

  return (
    <>
      <header className={css.Searchbar}>
        <form onSubmit={hendleSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchForm_button}>
            <ImSearch />
            <span className={css.SearchForm_button_label}>Search</span>
          </button>
          <input
            onChange={hendleChange}
            className={css.SearchForm_input}
            type="text"
            value={inputParam}
            name="inputParam"
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
};

Searchbar.propType = {
  onSubmit: PropTypes.func,
};

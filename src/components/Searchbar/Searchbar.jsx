import css from './SearchBar.module.css';
import { Component } from 'react';
import { FiSearch } from 'react-icons/fi';

export class Searchbar extends Component {
  state = {
    curentKeyWord: '',
  };

  onInputChange = event => {
    this.setState({ curentKeyWord: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.curentKeyWord);
    this.setState({ curentKeyWord: '' });
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.onFormSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <FiSearch size="16px" />
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.curentKeyWord}
            onChange={this.onInputChange}
          />
        </form>
      </header>
    );
  }
}

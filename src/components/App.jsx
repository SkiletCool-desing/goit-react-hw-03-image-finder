import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from '../services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import React from 'react';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    currentSearch: '',
    pageNr: 1,
    modalOpen: false,
    modalImg: '',
    modalAlt: '',
    total: '',
  };

  handleSubmit = async e => {
    e.preventDefault();
    const inputForSearch = e.target.elements.inputForSearch;
    if (inputForSearch.value.trim() === '') {
      return;
    }

    this.setState({
      currentSearch: inputForSearch.value,
      images: [],
      isLoading: false,
      pageNr: 1,
      modalOpen: false,
      modalImg: '',
      modalAlt: '',
      total: '',
    });
  };

  handleClickMore = () => {
    this.setState(prev => ({ pageNr: prev.pageNr + 1 }));
  };
  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.currentSearch;
    const nextQuery = this.state.currentSearch;
    const prevPage = prevState.pageNr;
    const nextPage = this.state.pageNr;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.getData();
    }
  }

  getData = async () => {
    this.setState({ isLoading: true });
    try {
      const response = await getImages(
        this.state.currentSearch,
        this.state.pageNr
      );
      this.setState({
        images: [...this.state.images, ...response.hits],
        total: response.totalHits,
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleImageClick = e => {
    this.setState({
      modalOpen: true,
      modalAlt: e.target.alt,
      modalImg: e.target.name,
    });
  };

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
      modalImg: '',
      modalAlt: '',
    });
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.handleModalClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <Searchbar onSubmit={this.handleSubmit} />
            <ImageGallery
              onImageClick={this.handleImageClick}
              images={this.state.images}
            />
            {this.state.images.length < this.state.total ? (
              <Button onClick={this.handleClickMore} />
            ) : null}
          </React.Fragment>
        )}
        {this.state.modalOpen ? (
          <Modal
            src={this.state.modalImg}
            alt={this.state.modalAlt}
            handleClose={this.handleModalClose}
          />
        ) : null}
      </div>
    );
  }
}

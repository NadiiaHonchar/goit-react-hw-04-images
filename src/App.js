import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Searchbar from "./components/Searchbar";
import ImageGalery from "./components/ImageGallery";
import Button from "./components/Button";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import style from "./App.module.css";
import ImageGalleryItem from "./components/ImageGalleryItem";

const API_KEY = "24626518-665b9f7b8dc290fe9a65ef06e";
const per_page = 12;

class App extends Component {
  state = {
    dateResponse: [{ id: null, webformatURL: null, largeImageURL: null }],
    page: 1,
    loading: false,
    error: null,
    searchName: "",
    showModal: false,
    tryImageID: "",
    largeImage: "",
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchName !== this.state.searchName ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=${API_KEY}&q=${this.state.searchName}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.state.page}&per_page=${per_page}`
        );
        if (response.data.total === 0 || response.data.hits.length < 1) {
          return toast(
            "Sorry, there are no images matching your search query. Please try again."
          );
        }
        if (!this.state.dateResponse[0].id) {
          return this.setState((e) => ({
            dateResponse: response.data.hits.map((item) => ({
              id: item.id,
              webformatURL: item.webformatURL,
              largeImageURL: item.largeImageURL,
            })),
          }));
        }
        if (this.state.dateResponse[0].id) {
          return this.setState((prevState) => ({
            dateResponse: [
              ...prevState.dateResponse,
              ...response.data.hits.map((item) => ({
                id: item.id,
                webformatURL: item.webformatURL,
                largeImageURL: item.largeImageURL,
              })),
            ],
          }));
        }
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  togleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  addSearchName = (searchName) => {
    this.setState({ page: 1 });
    this.setState({
      dateResponse: [{ id: null, webformatURL: null, largeImageURL: null }],
    });
    this.setState(searchName);
  };

  onLoadMore = () => {
    const newPage = this.state.page + 1;
    this.setState(() => ({ page: newPage }));
  };

  openModal = (e) => {
    this.setState({ showModal: true });
    const searchLargeImages = this.state.dateResponse.find(
      (option) => option.id === Number(e.currentTarget.alt)
    ).largeImageURL;
    this.setState({ tryImageID: e.currentTarget.alt });
    this.setState({ largeImage: searchLargeImages });
  };

  render() {
    const { error, loading, showModal, tryImageID, largeImage, dateResponse } =
      this.state;
    return (
      <>
        <div className={style.App}>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
          />
          <Searchbar onSubmit={this.addSearchName} />
          {loading && <Loader />}
          {error && toast.error(`Sorry something went wrong ! ${error}`)}
          {dateResponse[0].id && (
            <ImageGalery
              dateResponse={dateResponse}
              openModal={this.openModal}
            />
          )}
          {dateResponse[0].id && <Button onLoadMore={this.onLoadMore} />}
          {showModal && (
            <Modal onClose={this.togleModal}>
              <ImageGalleryItem
                id={Number(tryImageID)}
                webformatURL={largeImage}
                openModal={this.openModal}
              />
            </Modal>
          )}
        </div>
      </>
    );
  }
}

export default App;

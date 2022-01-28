import React, { Component } from "react";
import PropTypes from "prop-types";
import { ImSearch } from "react-icons/im";
import { toast } from "react-toastify";
import style from "./Searchbar.module.css";

class Searchbar extends Component {
  state = {
    searchName: "",
  };

  static defaultProps = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleInputChange = (e) => {
    this.setState({ searchName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchName.trim() === "") {
      toast.warn("please enter a request name", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        progress: 1,
      });
      return;
    }
    this.props.onSubmit(this.state);
    this.reset();
  };
  reset = () => {
    this.setState({ searchName: "" });
  };

  render = () => {
    return (
      <>
        <header className={style.Searchbar}>
          <form className={style.SearchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={style.SearchFormButton}>
              {" "}
              <ImSearch />
              <span className={style.SearchFormButtonLabel}>Search</span>
            </button>

            <input
              className={style.SearchFormInput}
              type="text"
              autoComplete="off"
              autoFocus={true}
              placeholder="Search images and photos"
              value={this.state.searchName}
              onChange={this.handleInputChange}
            />
          </form>
        </header>
      </>
    );
  };
}

export default Searchbar;

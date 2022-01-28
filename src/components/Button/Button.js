import React from "react";
import PropTypes from "prop-types";
import style from "./Button.module.css";

const Button = ({ onLoadMore }) => {
  return (
    <>
      <button
        type="submit"
        name="button"
        className={style.Button}
        onClick={() => onLoadMore()}
      >
        Load more
      </button>
    </>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;

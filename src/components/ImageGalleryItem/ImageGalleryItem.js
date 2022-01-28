import React from "react";
import PropTypes from "prop-types";
import style from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ id, webformatURL, openModal }) => {
  return (
    <>
      <li className={style.ImageGalleryItem}>
        <img
          className={style.ImageGalleryItemImage}
          src={webformatURL}
          alt={id}
          onClick={openModal}
        />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

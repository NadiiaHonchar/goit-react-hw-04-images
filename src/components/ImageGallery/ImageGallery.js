import React from "react";
import PropTypes from "prop-types";
import style from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem";

const ImageGalery = ({ dateResponse, openModal }) => {
  return (
    <ul className={style.ImageGallery}>
      {dateResponse.map(({ id, webformatURL }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          webformatURL={webformatURL}
          openModal={openModal}
        />
      ))}
    </ul>
  );
};

ImageGalery.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
  openModal: PropTypes.func.isRequired,
};

export default ImageGalery;

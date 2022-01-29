import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import style from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={style.Overlay} onClick={handleBackdropClick}>
      <div className={style.Modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};

// import React, { Component } from "react";
// import { createPortal } from "react-dom";
// import PropTypes from "prop-types";
// import style from "./Modal.module.css";

// const modalRoot = document.querySelector("#modal-root");

// class Modal extends Component {
//   static defaultProps = {
//     largeImage: PropTypes.string.isRequired,
//   };

//   componentDidMount() {
//     window.addEventListener("keydown", this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.handleKeyDown);
//   }

//   handleKeyDown = (e) => {
//     if (e.code === "Escape") {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = (e) => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={style.Overlay} onClick={this.handleBackdropClick}>
//         <div className={style.Modal}>{this.props.children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }
// export default Modal;

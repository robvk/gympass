import React from "react";
import "./creditBox.css";

import PropTypes from "prop-types";

const CreditBox = ({ credit, price, openModal, title }) => {
  return (
    <li className="card-container">
      <div className="card">
        <div className="card-content">
          <h2 className="card-title">{title} PACKAGE</h2>
          <h3 className="card-title">{credit} Credits</h3>
          <p className="card-title">Only {price} Euros!</p>
          <button className="event-card-link" onClick={openModal} id={credit}>
            Get {credit} Credits!
          </button>
        </div>
      </div>
    </li>
  );
};
CreditBox.propTypes = {
  credit: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default CreditBox;

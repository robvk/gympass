import React from "react";
import PropTypes from "prop-types";
import StyledConfirmationModal from "./StyledConfirmationModal";

const GetMembershipModal = ({ credit, onCancel, getMembership, dueDate }) => {
  return (
    <StyledConfirmationModal>
      <div className="modal">
        <p className="modal-text">
          You are getting {credit} credits. You can use your credits by{" "}
          {dueDate}.
        </p>
        <div className="btn-list">
          <button className="btn btn-approve" onClick={getMembership}>
            Get {credit} Credits!
          </button>
          <button className="btn btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </StyledConfirmationModal>
  );
};

GetMembershipModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  credit: PropTypes.number.isRequired,
  dueDate: PropTypes.string.isRequired,
  getMembership: PropTypes.func.isRequired,
};
export default GetMembershipModal;

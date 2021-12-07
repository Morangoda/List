import React from "react";

function ConfirmDialog({ item, onRemove, onCancel }) {
  return (
    <div className={`dialog-wrapper `}>
      <div className="container">
        <div className="confirmation-text">
          <h4>Are you sure you wish to delete this item?</h4>
          <div className="delited-item">
            <p>Name: {item.toyName}</p>
            <p>Color: {item.color}</p>
            <p>Number: {item.number}</p>
          </div>
        </div>
        <div className="button-container">
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirmation-button" onClick={onRemove}>
            Delete
          </button>
        </div>
      </div>
      <div className="confirm-bg" onClick={onCancel}></div>
    </div>
  );
}

export default ConfirmDialog;

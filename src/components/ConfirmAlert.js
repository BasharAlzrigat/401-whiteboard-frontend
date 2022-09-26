import React from "react";
import Modal from "react-bootstrap/Modal";

export default function ConfirmAlert({ data, handleClose, handleDeletePost }) {
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={data.show}
      onHide={handleClose}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pb-2">
        <div className="mb-3">
          <label htmlFor="confirm" className="form-label">
            Are you sure you want to delete this post?
          </label>
        </div>
        <div className="d-flex justify-content-between gap-4">
          <button
            type="submit"
            className="btn btn-danger w-100"
            onClick={() => handleDeletePost(data.postId)}
          >
            Delete
          </button>
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

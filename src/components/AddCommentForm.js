import React from "react";
import Modal from "react-bootstrap/Modal";

export default function AddCommentForm({show, handleClose, handleAddCommentSubmit}) {
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pb-2">
        <form onSubmit={(e)=>handleAddCommentSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="comment" className="form-label">
              Comment content
            </label>
            <textarea className="form-control" id="comment" rows="3"/>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Add Comment
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

import React from "react";
import Modal from "react-bootstrap/Modal";

export default function AddPostForm({show, handleClose, handleAddPostSubmit}) {
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Post</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pb-2">
        <form onSubmit={(e)=>handleAddPostSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="post" className="form-label">
              Post Name
            </label>
            <input
              placeholder="Enter Post Name"
              type="text"
              className="form-control"
              id="post"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Add Post
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

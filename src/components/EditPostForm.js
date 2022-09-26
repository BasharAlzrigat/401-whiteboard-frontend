import React from "react";
import Modal from "react-bootstrap/Modal";

export default function EditPostForm({ post, handleClose, handleEditPost }) {
  console.log(post);
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={post.show}
      onHide={handleClose}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pb-2">
        <form onSubmit={(e) => handleEditPost(e, post.data.id)}>
          <div className="mb-3">
            <label htmlFor="post" className="form-label">
              Post Name
            </label>
            <input
              placeholder="Enter Post Name"
              defaultValue={post.data?.title}
              type="text"
              className="form-control"
              id="post"
            />
          </div>
          <div className="d-flex justify-content-between gap-4">
            <button type="submit" className="btn btn-primary w-100">
              Edit Post
            </button>
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

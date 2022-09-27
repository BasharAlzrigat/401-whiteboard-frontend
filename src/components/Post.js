/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import AddPostForm from "./AddPostForm";
import AddCommentForm from "./AddCommentForm";
import ConfirmAlert from "./ConfirmAlert";
import EditPostForm from "./EditPostForm";

export default function Post() {
  const [showPostForm, setShowPostForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showConfirmAlert, setShowConfirmAlert] = useState({ show: false });
  const [showEditPostForm, setShowEditPostForm] = useState({ show: false });
  const [postData, setPostData] = useState([]);
  const [postId, setPostId] = useState();
  const [cookies, setCookie] = useCookies(["userCookie"]);
  const url = process.env.REACT_APP_BACK_END_URL;
  const bearerAuth = cookies.userCookie.token;
  const config = {
    headers: { Authorization: `Basic ${bearerAuth}` },
  };

  const handlePostFormClose = () => {
    setShowPostForm({ ...showPostForm, show: false });
  };

  const handleCommentFormClose = () => {
    setShowCommentForm({ ...showCommentForm, show: false });
  };

  const handleConfirmAlertClose = () => {
    setShowConfirmAlert({ ...showConfirmAlert, show: false });
  };

  const handleEditPostFormClose = () => {
    setShowEditPostForm({ ...showEditPostForm, show: false });
  };

  const handleAddPostSubmit = async (event) => {
    event.preventDefault();
    const bodyObj = { title: event.target.post.value, content: "" };
    await axios.post(`${url}/post`, bodyObj, config);
    setShowPostForm(false);
    handleData();
  };

  const handleAddCommentSubmit = async (event) => {
    event.preventDefault();

    const body = {
      comments: event.target.comment.value,
      postID: postId,
      id_users: cookies.userCookie.user.id,
    };
    await axios
      .post(`${url}/comments`, body)
      .then(() => {
        setShowCommentForm(false);
        handleData();
      })
      .catch((err) => {
        console.log("error in adding comment", err);
      });
  };

  const handleData = async () => {
    let postsData = [];
    let finalPostsData = [];
    await axios
      .get(`${url}/post`, config)
      .then((postsResult) => {
        postsData = postsResult.data;
      })
      .catch((err) => {
        console.log("getting Post Error:", err);
      });
    await axios
      .get(`${url}/comments`)
      .then((commentsResult) => {
        console.log("commentsResult", commentsResult);
        if (commentsResult.data.length !== 0) {
          postsData.forEach((post) => {
            commentsResult.data.forEach((comment) => {
              if (Number(post.id) === Number(comment.postID)) {
                if (!post.contents) post.contents = [];
                post.contents.push(comment.comments);
              }
            });
          });
        }
        finalPostsData = postsData;
      })
      .catch((err) => {
        console.log("getting Post Error:", err);
      });
    setPostData(finalPostsData);
  };

  const handleDeletePost = async (postId) => {
    await axios
      .delete(`${url}/post/${postId}`, config)
      .then(() => {
        handleData();
        setShowConfirmAlert(false);
      })
      .catch((err) => console.log("error in deleteing post", err));
  };

  const handleEditPost = async (e, postId) => {
    const body = {
      title: e.target.post.value,
      content: "",
    };
    await axios
      .put(`${url}/post/${postId}`, body, config)
      .then(() => handleData())
      .catch((err) => console.log("error in editing post", err));
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <>
      <AddPostForm
        show={showPostForm}
        handleClose={handlePostFormClose}
        handleAddPostSubmit={handleAddPostSubmit}
      />
      <AddCommentForm
        show={showCommentForm}
        handleClose={handleCommentFormClose}
        handleAddCommentSubmit={handleAddCommentSubmit}
      />
      <ConfirmAlert
        data={showConfirmAlert}
        handleClose={handleConfirmAlertClose}
        handleDeletePost={handleDeletePost}
      />
      <EditPostForm
        post={showEditPostForm}
        handleClose={handleEditPostFormClose}
        handleEditPost={handleEditPost}
      />
      <div className="mt-5 container d-flex text-left flex-column gap-4 w-50">
        <div className="mb-4">
          <h2 className="mb-4 ">Weclome to Posts Event</h2>
          <p className="mb-0">
            Here you can see and discuss any subject you want.
          </p>
          <div className="d-flex justify-content-between align-items-end">
            <div>
              <p className="mb-0">
                Feel free to add posts or add your thoughts and ideas in a
                comment below each post.
              </p>
            </div>
            <button
              onClick={() => {
                setShowPostForm(true);
              }}
              type="button"
              className="btn btn-primary"
            >
              Add Post
            </button>
          </div>
        </div>
        {postData.length !== 0 && (
          <div className="shadow p-4 d-flex flex-column gap-3">
            {postData.map((post, index) => {
              return (
                <div key={post.id}>
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <h5 className={index !== 0 ? "mt-4" : ""}>{post.title}</h5>
                    <div className="d-flex flex-row gap-3">
                      <button
                        onClick={() => {
                          setShowCommentForm(true);
                          setPostId(post.id);
                        }}
                        type="button"
                        className="btn btn-primary "
                      >
                        Add Comment
                      </button>
                      {cookies.userCookie.user.role === "admin" && (
                        <>
                          <button
                            onClick={() =>
                              setShowEditPostForm({
                                ...showEditPostForm,
                                show: true,
                                data: post,
                              })
                            }
                            type="button"
                            className="btn btn-primary "
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              setShowConfirmAlert({
                                ...showConfirmAlert,
                                show: true,
                                postId: post.id,
                              })
                            }
                            type="button"
                            className="btn btn-danger "
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  {post?.contents?.length > 0 && (
                    <div>
                      <hr />
                      <div>
                        <h6>Comments:</h6>
                        {post.contents.map((comment, index) => {
                          return (
                            <div className="d-flex flex-row align-items-center gap-2">
                              <h6 className="mb-0 text-dark">
                                Guest{index + 1}:
                              </h6>
                              <p className="mb-0">{comment}</p>
                            </div>
                          );
                        })}
                        <hr />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

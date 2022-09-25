/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import AddPostForm from "./AddPostForm";
import AddCommentForm from "./AddCommentForm";

export default function Post() {
  const [showPostForm, setShowPostForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [postData, setPostData] = useState([]);
  const [postId, setPostId] = useState();
  const [cookies, setCookie] = useCookies(['userCookie']);
  const url = process.env.REACT_APP_BACK_END_URL;
  const bearerAuth = cookies.userCookie.token;
  console.log("bearerAuth!!!!!!!!!", bearerAuth);
  const config = {
    headers: { Authorization: `Basic ${bearerAuth}` }
};
console.log("!!!!!!!!config", config);

  console.log("bearerAuth", bearerAuth);

  const handlePostFormClose = () => {
    setShowPostForm(false);
  };

  const handleCommentFormClose = () => {
    setShowCommentForm(false);
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
    
    const bodyObj = {
      comments: event.target.comment.value,
      postID: postId,
    };
     await axios.post(`${url}/comments`, bodyObj);
    setShowCommentForm(false);
    handleData();
  };

  const handleData = async () => {
    let postsData = [];
    let finalPostsData = [];
    await axios
      .get(`${url}/post`, config).then((postsResult) => {
        postsData = postsResult.data;
      })
      .catch((err) => {
        console.log("getting Post Error:", err);
      });
    await axios
      .get(`${url}/comments`).then((commentsResult) => {
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
                    <div>
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
                              <h6 className="mb-0">Guest{index + 1}:</h6>
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

import React from "react";
import AddNewComment from "./AddNewComment";
import "./CommentArea.css";
import Comments from "./Comments";

export default function CommentArea({ comments }) {
  return (
    <>
      <Comments comments={comments} />
      <AddNewComment />
    </>
  );
}

import React from "react";
import "./AddNewComment.css";
import { Link } from "react-router-dom";

// inporting contexts
import AuthContext from "../../context/authContext";
import { useContext, useState } from "react";
import {useParams} from 'react-router-dom' ;

// swal 
import swal from "sweetalert";
export default function AddNewComment() {
  // context =>
  const authContext = useContext(AuthContext);
  // states =>
  const [commentBody, setCommentBody] = useState("");
  const [commentStar , setCommentStar] = useState(5);

  const params = useParams();
  // posting comments =>
  // handler :
  const submitCommentHandler = () => {
    const newComment = {
      body: commentBody ,
      courseShortName: params.courseName ,
      score : commentStar ,
    };
    fetch('http://localhost:4000/v1/comments' , {
        method : 'POST' , 
        headers : {
            'Content-Type' : 'application/json'  ,
            'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`
        } , 
        body : JSON.stringify(newComment)
    }).then(res => res.json())
    .then(result => {
        swal({
            title : 'نظر شما با موفقیت ثبت شد' ,
            icon : 'success' ,
            button : 'تایید'
        })
    })
  };
  return (
    <>
      {authContext.isLoggedIn ? (
        <div className="rtl p-3">
          <div>دیدگاهتان را بنویسید.</div>
          <div className="text-muted my-2">
            با عنوان {authContext.userInfos.name} وارد شدید
          </div>
          <div>
            <div>دیدگاه *</div>
            <div className="my-2">
            <lable className="text-muted">امتیاز خود را انتخاب کنید</lable>
            <select className="form-control" onChange={(event) => setCommentStar(event.target.value)}>
              <option value="5">عالی</option>
              <option value="4">خیلی خوب</option>
              <option value="3">متوسط</option>
              <option value="2">ضعیف</option>
              <option value="1">بد</option>
            </select>
            </div>
            <textarea
              className="commentTextArea"
              onChange={(event) => setCommentBody(event.target.value)}
            >
              {commentBody}
            </textarea>
            <button
              className="fill-theme-btn bgTheme mt-2 py-2 px-3 shadow"
              onClick={submitCommentHandler}
            >
              فرستادن دیدگاه
            </button>
          </div>
        </div>
      ) : (
        <div className="alert alert-danger mx-auto w-100 my-3">
          برای ثبت نظر ابتدا{" "}
          <Link className="flatLink text-danger" to="/login">
            وارد شوید
          </Link>
        </div>
      )}
    </>
  );
}

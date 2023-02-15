import React from "react";
import { FaRegComments } from "react-icons/fa";
import "./Comments.css";



export default function Comments({ comments }) {
    
  return (
    <>
      <div className="p-3 rtl">
        <div className="h4 d-dlex justify-content-center align-items-center mb-5">
          <FaRegComments className="mx-2 commentIcon" />
          نظرات
        </div>
        {comments.length ? (
          <div>
            {comments.map((comment) => {
              return (
                <div className="commentBox my-2">
                  {/* // comment details */}
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div className="boldTxt">محمد امین سعیدی راد</div>
                      <div className="badge text-white p-1 bgTheme mx-2">
                        مدیر
                      </div>
                      <div>{comment.createdAt.slice(0,10)}</div>
                    </div>
                    <div>
                      <button className="btn border">پاسخ</button>
                    </div>
                  </div>
                  {/* // comment body */}
                  <div className="my-2">
                    <p>{comment.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
            <div className="alert alert-warning text-center w-100 mx-auto">هنوز نظری برای این دوره ثبت نشده</div>
        )}
      </div>
    </>
  );
}

import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import AddNewArticle from "../../../components/AdminPanel/AddNewArticle/AddNewArticle";
import DataTable from "../../../components/AdminPanel/DataTable/DataTable";
// icon 
import {MdDone} from 'react-icons/md'
export default function AdminArticles() {
  const [allArticles, setAllArticles] = useState([]);
  const [update , setUpdate] = useState(false)
  useEffect(() => {
    fetch("http://localhost:4000/v1/articles")
      .then((res) => res.json())
      .then((allArticles) => {
        setAllArticles(allArticles);
      });
  }, [update]);

  // handlers =>
  const removeArticleHandler = (id) => {
    swal({
      title: "ایا از حذف این مقاله اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((confirm) => {
      if (confirm) {
        fetch(`http://localhost:4000/v1/articles/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("user-token")
            )}`,
          },
        }).then(res => {
          if(res.ok){
            swal({
              title : 'مقاله با موفقیت حذف شد' ,
              icon : 'success' , 
              buttons : 'تایید'
            }).then(() => {
              setUpdate(prev => !prev)
            })
          }
        })
      }
    });
  };
  return (
    <>
    {/* // add new article */}
    <div className="container my-3">
      <div className="row">
        <AddNewArticle setUpdate={setUpdate}/>
      </div>
    </div>
    {/* // show all articles  */}
      <div className="container my-3">
        <div className="row">
          <DataTable title="لیست مقاله ها">
            <table className="table">
              <thead className="bg-light">
                <tr>
                  <th>شناسه</th>
                  <th>عنوان</th>
                  <th>لینک</th>
                  <th>نویسنده</th>
                  <th>انتشار</th>
                  <th>ویرایش</th>
                  <th>حذف</th>
                </tr>
              </thead>
              <tbody>
                {allArticles.map((article, index) => {
                  return (
                    <tr key={article._id}>
                      <td>{index + 1}</td>
                      <td>{article.title}</td>
                      <td>{article.shortName}</td>
                      <td>{article.creator.name}</td>
                      <td>{article.publish ? (
                        <MdDone />
                      )  : (
                        <button className="btn btn-secondary">
                          <Link to={`draft/${article.shortName}`} className="flatLink text-white">ادامه</Link>
                        </button>
                      )}</td>
                      <td>
                        <button className="btn btn-primary">ویرایش</button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => removeArticleHandler(article._id)}
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </DataTable>
        </div>
      </div>
    </>
  );
}

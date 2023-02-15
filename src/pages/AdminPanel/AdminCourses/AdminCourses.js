import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import DataTable from "../../../components/AdminPanel/DataTable/DataTable";
import AddNewCourse from "../../../components/AdminPanel/AddNewCourse/AddNewCourse"
export default function AdminCourses() {
  const [allCourses, setAllCourses] = useState([]);
  const [update,setUpdate] = useState(false)
  // useEffect =>
  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses`, {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("user-token"))}`,
    })
      .then((res) => res.json())
      .then((allCourses) => {
        setAllCourses(allCourses);
      });
  }, [update]);
  // handlers =>
  // delete course
  const removeCourseHandler = (id) => {
    swal({
      title: "حذف دوره",
      text: "ایا از حذف این دوره اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((confirm) => {
      if (confirm) {
        fetch(`http://localhost:4000/v1/courses/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("user-token")
            )}`,
          },
        }).then(res => {
          if(res.ok){
            swal({
              title : 'دوره مورد نظر با موفقیت حذف شد' ,
              icon : 'success' , 
              buttons : 'تایید' ,
            }).then(() => {
              setUpdate(prev => !prev);
            })
          }
        })
      }
    });
  };
  return (
    <>
      {/* // add new course */}
      <div className="container my-4">
        <div className="row">
          <AddNewCourse setUpdate={setUpdate}/>
        </div>
      </div>
      {/* // show all courses */}
      <div className="container my-4">
        <div className="row">
          <DataTable title="لیست دوره ها">
            <table className="table">
              <thead className="bg-light">
                <tr className="text-center">
                  <th>شناسه</th>
                  <th>عنوان</th>
                  <th>مبلغ</th>
                  <th>وضعیت</th>
                  <th>لینک</th>
                  <th>مدرس</th>
                  <th>دسته بندی</th>
                  <th>ویرایش</th>
                  <th>حذف</th>
                </tr>
              </thead>
              <tbody>
                {allCourses.map((course, index) => {
                  return (
                    <tr key={course._id} className="text-center">
                      <td>{index + 1}</td>
                      <td>{course.name}</td>
                      <td>
                        {course.price === 0 ? (
                          <span className="badge bg-success">رایگان</span>
                        ) : (
                          course.price.toLocaleString()
                        )}
                      </td>
                      <td>
                        {course.isComplete === 0
                          ? "درحال برگزاری"
                          : "تکمیل شده"}
                      </td>
                      <td>{`${course.shortName}/`}</td>
                      <td>{course.creator}</td>
                      <td>{course.categoryID}</td>
                      <td>
                        <button className="btn btn-primary">ویرایش</button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => removeCourseHandler(course._id)}
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

import React from "react";
import "./AddNewArticle.css";

// components
import Input from "../../Input/Input";

// validations
import {
  minValidator,
  requiredValidator,
  maxValidator,
} from "./../../../validations/rules";
// hooks
import { useForm } from "../../../hooks/useForm";
// icons
import { MdNoteAdd } from "react-icons/md";
import Editor from "../Editor/Editor";
import { useState } from "react";
import { useEffect } from "react";
import swal from "sweetalert";
export default function AddNewArticle({ setUpdate }) {
  const [articleBody, setArticleBody] = useState("");
  const [articleImg, setArticleImg] = useState({});
  const [articleCategoryId, setArticleCategoryId] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  // reducer
  const [formState, saveInputDataHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // useEffect =>
  useEffect(() => {
    fetch("http://localhost:4000/v1/category")
      .then((res) => res.json())
      .then((data) => {
        setAllCategories(data);
        setArticleCategoryId(data[0]._id);
      });
  }, []);

  // handler =>
  const addNewArticleHandler = () => {
    const formData = new FormData();
    formData.append("title", formState.inputsDetails.title.value);
    formData.append("description", formState.inputsDetails.description.value);
    formData.append("body", articleBody);
    formData.append("shortName", formState.inputsDetails.shortName.value);
    formData.append("categoryID", articleCategoryId);
    formData.append("cover", articleImg);

    fetch(`http://localhost:4000/v1/articles`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user-token")
        )}`,
      },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "?????????? ???? ???????????? ???????????? ????",
          icon: "success",
          buttons: "????????",
        }).then((res) => {
          // update
          setUpdate((prev) => !prev);
        });
      }
    });
  };
  const draftArticleHandler = () => {
    const formData = new FormData();
    formData.append("title", formState.inputsDetails.title.value);
    formData.append("description", formState.inputsDetails.description.value);
    formData.append("body", articleBody);
    formData.append("shortName", formState.inputsDetails.shortName.value);
    formData.append("categoryID", articleCategoryId);
    formData.append("cover", articleImg);


    fetch(`http://localhost:4000/v1/articles/draft`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user-token")
        )}`,
      },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "?????????? ???? ???????????? ?????? ???????? ????",
          icon: "success",
          buttons: "????????",
        }).then((res) => {
          // update
          setUpdate((prev) => !prev);
        });
      }
    });

  };
  return (
    <>
      <div className="addNewArticle">
        <div className="my-3">
          <MdNoteAdd className="addNewArticleIcon" />
        </div>
        <div>
          <div className="row">
            {/* // title input */}
            <div className="col-md-6">
              <div>
                <div className="addNewArticleLable">??????????</div>
                <Input
                  validations={[minValidator(5)]}
                  element="input"
                  id="title"
                  saveInputDataHandler={saveInputDataHandler}
                  type="text"
                  placeholder="?????????? ?????????? ???? ???????? ????????"
                  className="loginInput form-control"
                />
              </div>
            </div>
            {/* // shortName input */}
            <div className="col-md-6">
              <div>
                <div className="addNewArticleLable">????????</div>
                <Input
                  validations={[minValidator(4)]}
                  element="input"
                  id="shortName"
                  saveInputDataHandler={saveInputDataHandler}
                  type="text"
                  placeholder="???????? ?????????? ???? ???????? ????????"
                  className="loginInput form-control"
                />
              </div>
            </div>
            {/* // description input */}
            <div className="col-12">
              <div>
                <div className="addNewArticleLable">??????????</div>
                <Input
                  validations={[minValidator(10)]}
                  element="textarea"
                  id="description"
                  saveInputDataHandler={saveInputDataHandler}
                  type="text"
                  placeholder="?????????? ?????????? ???? ???????? ????????"
                  className="loginInput form-control textareaHeight"
                />
              </div>
            </div>
            {/* // body input */}
            <div className="col-12">
              <div>
                <div className="addNewArticleLable">??????????</div>
                <Editor value={articleBody} setValue={setArticleBody} />
              </div>
            </div>
            {/* // shortName input */}
            <div className="col-md-6">
              <div>
                <div className="addNewArticleLable">??????</div>
                <input
                  type="file"
                  className="form-control"
                  onChange={(event) => setArticleImg(event.target.files[0])}
                />
              </div>
            </div>
            {/* // shortName input */}
            <div className="col-md-6">
              <div>
                <div className="addNewArticleLable">???????? ????????</div>
                <select
                  className="form-control"
                  onChange={(event) => setArticleCategoryId(event.target.value)}
                >
                  {allCategories.map((ctg) => {
                    return (
                      <option key={ctg._id} value={ctg._id}>
                        {ctg.title}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="text-start">
              <button
                className="btn btn-primary"
                disabled={!formState.isFormValid}
                onClick={draftArticleHandler}
              >
                ?????? ????????
              </button>
              <button
                className="btn btn-primary mx-2"
                disabled={!formState.isFormValid}
                onClick={addNewArticleHandler}
              >
                ????????????
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

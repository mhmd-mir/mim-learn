import React, { useEffect, useReducer } from "react";
import "./Input.css";

// importing validations
import { validator } from "./../../validations/validatorFuncs";

const manageReducer = (currentState, action) => {
  switch (action.type) {
    case "CHANGE": {
      return {
        ...currentState,
        value: action.value,
        isValidate: validator(action.value , action.validations),
      }
    }
    default : {
        return currentState
    }
  }
};

export default function Input(props) {
  const [inputDetails, dispatch] = useReducer(manageReducer, {
    value: "",
    isValidate: false,
  });

  useEffect(() => {
    props.saveInputDataHandler(props.id , inputDetails.value , inputDetails.isValidate)
  } , [inputDetails.value])

  const element =
    props.element === "input" ? (
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={`${props.className} ${inputDetails.isValidate ? 'isValidInput' : 'isNotValidInput'}`}
        value={inputDetails.value}
        onChange={(event) =>
          dispatch({
            type: "CHANGE",
            value: event.target.value,
            validations : props.validations
          })
        }
      />
    ) : (
      <textarea
      className={`${props.className} ${inputDetails.isValidate ? 'isValidInput' : 'isNotValidInput'}`}
      value={inputDetails.value}
        onChange={(event) =>
          dispatch({
            type: "CHANGE",
            value: event.target.value,
            validations : props.validations
          })
        }
        placeholder={props.placeholder}
      ></textarea>
    );
  return <>{element}</>;
}

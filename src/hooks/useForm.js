import { useCallback, useReducer } from "react";


const isAllInputsValid = (newId ,newValidSitu, prevDetails) => {
    let currentState = {...prevDetails}
    // let validSituArr = [] ;
    for(let inputId in prevDetails.inputsDetails){
        if(inputId === newId){
            currentState.inputsDetails[newId].isValid = newValidSitu ;
        }
    }
    for (let inputId in currentState.inputsDetails) {
        // validSituArr.push(currentState.inputsDetails[inputId].isValid)
        if(!currentState.inputsDetails[inputId].isValid){
            return false
        }
    }
    return true
    // console.log(validSituArr);
}



const formReducer = (state , action) => {
    switch(action.type){
        case 'INPUT_CHANGE' : {
            return {
                ...state ,
                inputsDetails : {
                    ...state.inputsDetails ,
                    [action.id] : {
                        value : action.value ,
                        isValid : action.isValid
                    }
                },
                isFormValid : isAllInputsValid(action.id , action.isValid , state)
            }
        }
        default : {
            return state
        }
    }
}

export function useForm(initInputDetails , initIsFormValid ) {
  const [formState , dispatch] = useReducer(formReducer , {
    inputsDetails : initInputDetails ,
    isFormValid : initIsFormValid
  })

  const saveInputDataHandler = useCallback((id , value  , isValid) => {
    dispatch({
        type : 'INPUT_CHANGE' , 
        id ,
        value ,
        isValid
    })
  } , [])

  return [formState , saveInputDataHandler]
}

import rules from './rules'

const validator = (value , validations) =>{
    let resArr = [] ;
    for (const validation of validations) {
        if(validation.value === rules.requiredValueRuleName){
            (!value.trim().length) && resArr.push(false)
        }
        if(validation.value === rules.minValueRuleName){
            (value.trim().length < validation.min ) && resArr.push(false)
        }
        if(validation.value === rules.maxValueRuleName){
            (value.trim().length > validation.max ) && resArr.push(false)
        }
        if(validation.value === rules.emailValueRuleName){
            !(/^[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}$/g.test(value)) && resArr.push(false)
        }
        if(validation.value === rules.phoneValueRuleName){
           !( /^\d{11}$/g.test(value)) && resArr.push(false)
        }
    }
    
    if(resArr.length){
        return false
    }else{
        return true
    }
}


export {validator}
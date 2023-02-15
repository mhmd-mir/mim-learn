const requiredValueRuleName = "REQUIRED_VALUE";
const minValueRuleName = "MIN_VALUE";
const maxValueRuleName = "MAX_VALUE";
const emailValueRuleName = "EMAIL_VALUE";
const phoneValueRuleName = "PHONE_VALUE" ;




export const requiredValidator = () => ({
    value: requiredValueRuleName,
  });
  
  export const minValidator = (min) => ({
    value: minValueRuleName,
    min,
  });
  
  export const maxValidator = (max) => ({
    value: maxValueRuleName,
    max,
  });
  
  export const emailValidator = () => ({
    value: emailValueRuleName,
  });
  export const phoneValidator = () => ({
    value: phoneValueRuleName,
  });


  export default { requiredValueRuleName, minValueRuleName, maxValueRuleName, emailValueRuleName , phoneValueRuleName };
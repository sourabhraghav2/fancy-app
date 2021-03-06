import React, {useState,useEffect} from 'react'
import 'components/useraccount/style/userLoginForm.scss';
import Translation from 'language/LanguageModel';
import { emailValidationPattern,EMPTY, INVALID_EMAIL, USERNAME_PASSWORD_NOT_FILLED } from 'common/constants';

interface Props {
  viewModel:Translation,
  loginClickHandler,
  displayCreateAccountHandler,
  loading:boolean,
  message:string
}

const UserLoginForm=(props:Props)=>{
      
  const [username,setUsername] = useState(EMPTY);
  const [password,setPassword] = useState(EMPTY);
  const [validationPass,setValidationPass] = useState(false);
  const [checkError,setcheckError] = useState(false);
  const [displayError,setDisplayError] = useState(EMPTY);
  
  useEffect(() => {
      if (username===EMPTY || password ===EMPTY || !emailValidationPattern.test(username)){
        setValidationPass(false)  
      }else 
        setValidationPass(true)  
      
      //validation failed
      if((!validationPass && checkError)){ 
        if(!emailValidationPattern.test(username)){
          setDisplayError(INVALID_EMAIL)  
        }else
          setDisplayError(USERNAME_PASSWORD_NOT_FILLED)
      }else {
        setDisplayError(EMPTY)
      }
      
  }, [username ,password]);

  useEffect(() => {
    setDisplayError(props.message)
  }, [props.message]);

  const loginClick =()=>{
    if(username && password && validationPass){
          props.loginClickHandler(username,password)
    }else 
      setcheckError(true)
  }

  return (
      <div className="user-login-form">
          <div className="title each-element">{props.viewModel.FANCY_APP}</div>
          <label className="email-label each-element">{props.viewModel.EMAIL}</label>
          
          <input required 
            className="input-email each-element" 
            placeholder="user@example.com" 
            onChange={event=>{
              event && setUsername(event.target.value);
              setcheckError(true)
            }}
          />
          <label className="password-label each-element" >{props.viewModel.PASSWORD}</label>
          <input required 
            className="input-password each-element"
            type="password" 
            placeholder="*********" 
            onChange={event=>{
              event && setPassword(event.target.value);
              setcheckError(true)
            }}
          />
          <div className="validation-message">
            {displayError}
          </div>
          <button  
            className="login-btn btn active-btn each-element" onClick={loginClick}>
              {props.loading ? <i className="fa fa-spinner fa-spin"></i>:props.viewModel.LOGIN}
          </button>
          <button className="new-account-btn btn each-element" onClick={props.displayCreateAccountHandler}>
          {props.viewModel.CREATE_NEW_ACCOUNT}
          </button>
      </div>
    )
  }

  export default UserLoginForm
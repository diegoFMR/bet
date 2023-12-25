import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import util from '../util/util';
//css
import '../style/app.css';
//icons
import { GrContactInfo } from 'react-icons/gr';
//controller
import loginController from '../controllers/loginController';

function RegisterPage ({setUserProfile}) {
  let [pwdRegister, setPwdRegister] = useState('');
  let [emailRegister, setEmailRegister] = useState('');
  let [name, setName] = useState('');
  let [discord, setDiscord] = useState('');
  let [adult, setAdult] = useState(null);
  let [conditions, setConditions] = useState(null);

  let navigate = useNavigate();
  
  let handleSubmit = async (e) => {
    e.preventDefault();
    
    if(name == "" || emailRegister === "" || pwdRegister == "" || discord == "" || !adult || !conditions){
      alert("Please enter all the values!")
    }else{
      try{
        console.log(adult); console.log(conditions)
        let params = {name: name, email: emailRegister, pwd: pwdRegister, discord: discord}
        
        const response = await loginController.register(params);

        switch(response.status) {
          case 202:
            // User already registed
            alert("The user is already registered. Would you like to login?");
            break;
          case 200:
            // Success
            alert("User registration has been successful!");
            const res = await response.json();
            setUserProfile({id: res.insertId, name: name, email: emailRegister});
            navigate('/welcome');
            break;
          default:
            // code block
            alert("There was an error. Please contact support!");
        }
      }catch(e){
        alert("There was an unexpected issue with the system. Please contact technical support.");
      }
    }//ELSE ENDS
  };//handleSubmit ends

  return (
    <div className='outer'>
      <div className='login-container'>
        <div className='form-container'>
          <div className='login-label'>
            <GrContactInfo/>
          </div>
          <form className='form' onSubmit={handleSubmit}>
            <div className='form-row'>
              <label htmlFor='email' className='form-label'>
                Name
              </label>
              <input
                type='text'
                className='form-input'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='form-row'>
              <label htmlFor='name' className='form-label'>
                Password
              </label>
              <input
                type='password'
                className='form-input'
                id='pwdRegister'
                value={pwdRegister}
                onChange={(e) => setPwdRegister(e.target.value)}
              />
            </div>
            <div className='form-row'>
              <label htmlFor='email' className='form-label'>
                email
              </label>
              <input
                type='email'
                className='form-input'
                id='emailRegister'
                value={emailRegister}
                onChange={(e) => setEmailRegister(e.target.value)}
              />
            </div>
            <div className='form-row'>
              <label htmlFor='email' className='form-label'>
                Discord user
              </label>
              <input
                type='text'
                className='form-input'
                id='discord'
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
              />
            </div>
            <div className='form-row'>
              <input
                type='checkbox'
                className='form-input'
                id='adult'
                value={adult? true: false}
                onClick={(e) => setAdult(adult? false: true)}
              />
              <label htmlFor='adult' className='form-label'>
                I'm 18 years old or older
              </label>
            </div>
            <div className='form-row'>
              <input
                type='checkbox'
                className='form-input'
                id='conditions'
                value={conditions? true: false}
                onClick={(e) => setConditions(conditions? false: true)}
              />
              <label htmlFor='adult' className='form-label'>

                I accept the <a href='../../public/legal/terms_and_conditions.pdf' download="terms_and_conditions" target='_blank'>terms and conditions</a>
              </label>
            </div>
            <div className='btn-container'>
              <button type='submit' className='btn btn-confirm'>
                Register
              </button>
              <div className='form-row link-container'>
                <p onClick={()=>navigate('/login')}>Go to login...</p>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};//Login ends

export default RegisterPage;

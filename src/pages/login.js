import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik'; 
import * as Yup from 'yup';
//controller
import loginController from '../controllers/loginController';
//icons
import { BsShieldLockFill } from 'react-icons/bs';
import { IoEnterOutline } from 'react-icons/io5';
//components
import Button from '../components/Button';

function Login ({setUserProfile}) {
  let initialValues = {
    pwd: "pwd",
    email: "d@d.com"
  }
  let navigate = useNavigate();
  let loading = false;

  let handleSubmit = async(params)=>{
    loading = true;
    loginController.findUser(params)
      .then((data)=>{
        loading = false;
        setUserProfile(data[0]);
    })
    .catch(()=>loading = false)
    .then(()=>navigate('/welcome'));

  }//handleSubmit ends

  let validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    pwd: Yup.string().required("Password is required")
  })

  return ( 
    <div className='outer'>
    <div className='login-container'>
      <div className='form-container'>
      <Formik 
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {
        (props)=>{
          return (
            <form className='form' onSubmit={props.handleSubmit}>
              <div className='login-label'>
                {loading? <div className="lds-ring"><div/><div/><div/></div> : <BsShieldLockFill/>}
              </div>
              <div className='form-row'>
                <div className='form-label'>
                  Email
                </div>
                <div className='form-input'>
                  <input
                    type='email'
                    id='email'
                    value={props.values.email}
                    onChange={props.handleChange}
                  />
                </div>
                <div className='error'>{props.errors.email}</div>
              </div>
              <div className='form-row'>
                <div className='form-label'>
                  Password
                </div>
                <div className='form-input'>
                  <input
                    type='password'
                    className='form-input'
                    id='pwd'
                    value={props.values.pwd}
                    onChange={props.handleChange}
                  />
                  <div className='error'>{props.errors.pwd}</div>
                </div>
              </div>

              <div className='btn-container'>
                <Button 
                  type='submit' 
                  classs='btn btn-confirm' 
                  icon={IoEnterOutline}
                  disabled={loading}
                  />
                <div className='link-container'>
                  <p onClick={()=>navigate('/register')}>Sign up</p>
                </div>
              </div>
              
            </form>
            );//return ends
          }//callback ends
        }
      
      </Formik>
      </div>
      </div>
    </div>
  );
};//Login ends

export default Login;

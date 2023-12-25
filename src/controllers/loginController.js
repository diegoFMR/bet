//UTIL
import util from '../util/util';

const loginController = {

    findUser: (data) => {
        let params = {email: data.email, pwd: data.pwd}

        return new Promise((resolve, reject)=>{
            try{
                fetch(util.API.USER.FIND_USER, {
                  method: "post",
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify(params)
                  })
                  .then((response)=>{
                    switch(response.status){
                      case 404:
                        alert(" Wrong user name or password ");
                        reject();
                        break;
                      case 500:
                        alert("There was an issue with the server. Please contact technical support.");
                        console.log("inside here")
                        reject();
                        break;
                      case 200:
                        resolve(response.json())      
                        break;
                      default:
                        alert("There was an unexpected issue with the system. Please contact technical support.");
                        reject();
                    }//swtich ends
                    
                }).catch(()=>reject());//fetch.then ends  
              }catch(e){
                alert("There was an unexpected issue with the system. Please contact technical support.");
                console.log("inside default")
                reject();
              }
        });//return Promise ends
        
    },//handleSubmit ends,
    getByName: name=>{
        return new Promise((resolve, reject)=>{
            try{
                fetch(util.API.USER.GET_BY_NAME, {
                  method: "post",
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({name})
                  })
                  .then((response)=>{
                    switch(response.status){
                      case 500:
                        alert("There was an issue with the server. Please contact technical support.");
                        reject();
                        break;
                      case 200:
                        resolve(response.json())      
                        break;
                      default:
                        alert("There was an unexpected issue with the system. Please contact technical support.");
                        reject();
                    }//swtich ends
                    
                }).catch(()=>reject());//fetch.then ends  
              }catch(e){
                alert("There was an unexpected issue with the system. Please contact technical support.");
                console.log("inside default")
                reject();
              }
        });//return Promise ends
    },
    register: (params) => {
      return new Promise((resolve, reject)=>{
              fetch(util.API.USER.REGISTER, {
                method: "post",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(params)
                })
                .then(response=>resolve(response))
                .catch((e)=>reject(e));//fetch.then ends  
      });//return Promise ends   
  } 
}

export default loginController;
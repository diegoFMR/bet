//UTIL
import util from '../util/util';

const inviteController = {

    insertInvite: (params) => {
        return new Promise((resolve, reject)=>{
            try{
                fetch(util.API.INVITE.INSERT, {
                  method: "post",
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify(params)
                  })
                  .then((response)=>{
                    switch(response.status){
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
                reject();
              }
        });//return Promise ends
        
    }//insert ends
}//const ends

export default inviteController;
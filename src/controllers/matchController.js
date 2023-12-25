import util from "../util/util";

const matchController = {
  deleteMatch: (id)=>{
    return new Promise((resolve)=>{
      try{
        fetch(util.API.GAME.DELETE, {
          method: "post",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({id})
          }).then((response)=>{
            switch(response.status){
              case 500:
                alert("There was an issue with the server. Please contact technical support.");
                break;
              case 202:
                alert("Match deleted sucessfully!")    
                break;
              default:
                alert("There was an unexpected issue with the system. Please contact technical support.");
            }//swtich ends
            resolve();
        });//fetch.then ends
    
      }catch(e){
        alert("There was an unexpected issue with the system. Please contact technical support.");
      }
    });//return ends
  },//deleteMatch ends
  insert: async (params, onSuccess)=>{

    try{
      let response = await fetch(util.API.MATCH.CREATE, {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params)
        });
        
        switch(response.status){
          case 500:
            alert("There was an issue with the server. Please contact technical support.");
            break;
          case 202:
            alert("Match saved sucessfully!");
            if(onSuccess){
              try{
                const {insertId} = await response.json();//extracting the insertedId
                onSuccess(insertId);
              }catch(e){
                console.log(e);
              }  //end catch
            }//end if
            break;
          default:
            alert("There was an unexpected issue with the system. Please contact technical support.");
        }//swtich ends
  
    }catch(e){
      console.log(e)
      alert("There was an unexpected issue with the system. Please contact technical support.");
    }
  },//insertMatch ends
  findAvailableGames: async (host) => {
    let params = {host}
    try{
      let response = await fetch(util.API.MATCH.SHOW_AVAILABLE_MATCH, {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params)
        });

        switch(response.status){
          case 404:
            alert(" Couldnt load the next game ");
            break;
          case 500:
           alert("There was an issue with the server. Please contact technical support.");  
           break;
          case 200:
           return response.json()
          default:
            alert("There was an unexpected issue with the system. Please contact technical support.");
        }//swtich ends
      
    }catch(e){
      alert("There was an unexpected issue with the system. Please contact technical support.");
    }
  },//insert ends
  setAgaints: async (params) => {
    try{
      const response = await fetch(util.API.MATCH.UPDATE_AGAINST, {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params)
        });

        switch(response.status){
          case 202:
            const returnObj = {json: response.json(), currentLive: true }
           return returnObj//Flag to check if a game is currently being played
          case 200:
           return response.json()
          default:
            alert("Could not accept the bet. Please contact technical support.");
        }//swtich ends
      
    }catch(e){
      alert("There was an unexpected issue with the system. Please contact technical support.");
    }
  },// ends
  checkResult: async (params) => {
    try{
      const response = await fetch(util.API.MATCH.CHECK_RESULT, {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params)
        });

        return response
      
    }catch(e){
      alert("There was an unexpected issue with the system. Please contact technical support.");
    }
  },
  checkCurrent: async (params) => {
    try{
      const response = await fetch(util.API.MATCH.CHECK_CURRENT, {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params)
        });

        return response
      
    }catch(e){
      alert("There was an unexpected issue with the system. Please contact technical support.");
    }
  },
  activate: async (params) => {
    try{
      const response = await fetch(util.API.MATCH.ACTIVATE, {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params)
        });

        return response
      
    }catch(e){
      alert("There was an unexpected issue with the system. Please contact technical support.");
    }
  },
  setReady: async (params) => {
    try{
      const response = await fetch(util.API.MATCH.SET_READY, {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params)
        });

        return response
      
    }catch(e){
      alert("There was an unexpected issue with the system. Please contact technical support.");
    }
  },
  cancel: async (params) => {
    try{
      const response = await fetch(util.API.MATCH.CANCEL, {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params)
        });

        return response
      
    }catch(e){
      alert("There was an unexpected issue with the system. Please contact technical support.");
    }
  },
  setScore: async (params) => {
    try{
      const response = await fetch(util.API.MATCH.SET_SCORE, {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params)
        });

        return response
      
    }catch(e){
      alert("There was an unexpected issue with the system. Please contact technical support.");
    }
  },
  setWinner: async (params) => {
    try{
      const response = await fetch(util.API.MATCH.SET_WINNER, {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params)
        });

        return response
      
    }catch(e){
      alert("There was an unexpected issue with the system. Please contact technical support.");
    }
  }
}

export default matchController;
//UTIL
import util from '../util/util';

let gameController = {
  request: async()=>{

    let req = await fetch(util.API.GAME.LIST,{
        method: "get",
        headers: {'Content-Type': 'application/json'},
    });
    
    switch(req.status){
        case 404:
          alert("Couldnt load the teams ");
          break;
        case 500:
          alert("There was an issue with the server. Please contact technical support.");
          break;
        case 200:
          return req.json()
        default:
          alert("There was an unexpected issue with the system. Please contact technical support.");
      }//swtich ends

    return null;
  }
}


export default gameController;

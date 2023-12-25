const paymentController = {
  addCredit: (email, ammount)=>{
    return new Promise((resolve)=>{
      try{
        fetch('http://localhost:4200/user/add_credit', {
          method: "post",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({email, ammount})
          }).then((response)=>{
            switch(response.status){
              case 500:
                alert("There was an issue with the server. Please contact technical support.");
                break;
              case 200:
                alert("credit added sucessfully!")    
                break;
              default:
                alert("There was an unexpected issue with the system. Please contact technical support.");
            }//swtich ends

            resolve(response.json());
        });//fetch.then ends
    
      }catch(e){
        alert("There was an unexpected issue with the system. Please contact technical support.");
      }
    });//return ends
  }
}

export default paymentController;
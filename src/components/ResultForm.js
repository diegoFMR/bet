import { useState } from 'react';
//controller
import matchController from '../controllers/matchController';
//css and icons
// import { FiCalendar  } from 'react-icons/fi';
// import { GiBaseballBat  } from 'react-icons/gi';

function ResultForm ({user, match, setState}) {
  let [hostScore, setHostScore] = useState('');
  let [againstScore, setAgainstScore] = useState('');
  console.log(match);
  console.log(user);

  function validInputs(){
    let flag = true;
    try{
      if(hostScore.length == 0 || parseFloat(hostScore) < 0 || againstScore.length == 0 || parseFloat(againstScore) < 0){
        flag = false;
      }
    }catch(e){
      alert("There was an unexpected error. Please close the web browser and try it again. Contact support if the issue persist.");
      flag = undefined;
    }
    
    return flag;
  }

  function isHost(match, user){//takes in a match obj
    return match.hostId == user.id
  }

  async function checkResults(e){
    try{
      e.preventDefault();
      const params = {
        match: match.match
      };
      console.log('se viene para aca')
      const response = await matchController.checkResult(params);
      /*
    ------- STATUS CODES:
      200: The result has already been set. returning hostWon boolean 
      220: The result was calculated and updated successfully. returning hostWon boolean  
      230: The results do not match the same winner. 
      4000: no results found for none of the users
      404: No match found
      500: Internal error
    */
    let r;
    switch (response.status) {
      case 200:
        r = await response.json();
        if(r.hostWon && isHost(match, user)){
          alert("Congratulations, you have won!");
          const params2 = { email: user.email , match: match.match }
          const response2 = await matchController.addGameCredit(params2);
          console.log(response2);
        }else if(!r.hostWon && !isHost(match, user)){
          alert("Congratulations, you have won!");
         
        }else{
          alert("You opponent has won. Better luck next time!");
        }
        break;
      case 220:
        console.log('aqui weeee')
        r = await response.json();
        if(r.hostWon && isHost(match, user)){
          console.log('FIRST')
          alert("Congratulations, you have won!");
          const params2 = { email: user.email , match: match.match }
          const response2 = await matchController.addGameCredit(params2);
          console.log(response2);
        }else if(!r.hostWon && !isHost(match, user)){
          console.log('SECOND')
          alert("Congratulations, you have won!");
          const params2 = { email: user.email , match: match.match }
          const response2 = await matchController.addGameCredit(params2);
          console.log(response2);
        }else{
          console.log('ELSE')
          alert("You opponent has won. Better luck next time!");
        }
        break;
      case 230:
        alert("Your results and your opponent's do not match. Please input the result again.");
        setState();
        break;

      default:
        alert("There was an unexpected error. Please contact support")
        break;
      }
    }catch(e){
      console.log('error in the catch');
      console.log(e);
    }
  }

  async function submitScore(e){
    try{
      e.preventDefault();
    
      if(validInputs()){
        const score = `${hostScore} - ${againstScore}`;;
        if(confirm('Are you sure that you want submit the following score: '+score)){
          try{
            const matchId = match.match;
            const host = isHost(match, user);

            const params = {
              match: matchId,
              host: host,
              score: score
            }
            const response = await matchController.setScore(params);
            
            if(response.status == 200){
              alert("Result saved successfully!\n The winner will be decided once the timer ends. Please remain on the website on the meantime.");
            }else{
              alert("There was an error. Please try again or contact support.");
            }

          }catch(err){
            alert("There was an unexpected issue. Please try to submit again or contact support.")
          }
        }
        
      }else{
        alert("Please input a valid score and try again.")
      }
    }catch(e){
      console.log(e)
      alert("The invite couldn't be sent but the match was created successfully!");
    }

  }

  return (
    <div className='match-container'>
        <div className='match-form'>
        <div className='row'>
            Host 
            <input
              type='number'
              id='hostScore'
              value={hostScore}
              onChange={(e)=>{setHostScore(e.target.value)}}
              min="0"
            />
          </div>
          <div className='row'>
            <div className='icon-container'>VS</div>
          </div>
          <div className='row'>
            Against 
            <input
              type='number'
              id='against'
              value={againstScore}
              onChange={(e)=>{setAgainstScore(e.target.value)}}
              min="0"
            />
          </div>
        <div className='row btn-container'>
            <button 
              onClick={(e)=>submitScore(e)}
              className='btn btn-confirm'
              >Submit</button>
        </div>
        <div className='row btn-container'>
            <button 
              onClick={(e)=>checkResults(e)}
              className='btn btn-cancel'
              >Check result</button>
        </div>
           
        </div>
    </div>
  );
};//Login ends

export default ResultForm;

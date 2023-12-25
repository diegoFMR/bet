// import { useNavigate } from 'react-router-dom';
// //controller
// import loginController from '../controllers/loginController';
// //icons
// import { BsShieldLockFill } from 'react-icons/bs';
// import { IoEnterOutline } from 'react-icons/io5';
//components
import Button from "../../components/Button";
function GameView ({match, onClickStart, onClickCancel}) {

  return ( 
    <div>
    <span>Match</span><span>{match.match}</span>
    <span>Platform</span><span>{match.platform}</span>
    <span>Type</span><span>{match.type}</span>
    <span>Time</span><span>{match.time_created}</span>
    <span>result</span><span>{match.result}</span>
    <span>quantity</span><span>{match.quantity}</span>
    <span>host</span><span>{match.hostId} - {match.hostName}. Discord {match.hostDiscord}</span>
    <span>against</span><span>{match.againstId} - {match.againstName}. Discord {match.againstDiscord}</span>
    <div>
      <Button 
        text="Start match" 
        classs="btn btn-confirm"
        disabled={false} 
        type="submit"
        onClick={onClickStart}
      />
    </div>
    <div>
      <Button 
        text="Cancel bet" 
        classs="btn btn-cancel"
        disabled={false} 
        type="submit"
        onClick={onClickCancel}
      />
    </div>
    
  </div> 
  );
};//Login ends

export default GameView;

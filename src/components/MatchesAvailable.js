import { GiConfirmed } from 'react-icons/gi';
import { BiBaseball } from 'react-icons/bi';
import { MdDeleteOutline,MdMode } from 'react-icons/md';

function MatchesAvailable({data, onEdit, onAccept}){

  let results;

    if(data.length > 0){
      results = data.map((item, index)=>{
        return (
          <div key={index} className="game-container">
            <div className="buttons-container">
              <div className="delete btn-icon" onClick={()=>onDelete(item)}>
                <MdDeleteOutline/>
              </div>
              <div className="edit btn-icon" onClick={()=>onEdit(item)}>
                <MdMode/> {item.host}
              </div>
  
            </div>
            
            <div>
              Platform: {item.platform}
            </div> 
            <div>
              Game: {item.game}
            </div> 
            <div>
              Type: {item.type}
            </div> 
            <div>
              <BiBaseball/> {item.quantity}
            </div>
            <div>
            {/* <FiNavigation/> {item.stadiumAddress} */}
            </div>
            <div 
              className='acept-btn'
              onClick={()=>onAccept(item.match)}>
             <GiConfirmed className='accept-btn'/>Acept bet
            </div>
          </div>   
        )
      })//map ends
    }else{
      results = <h2>No games found</h2>
    }
    

    return results;
  }//showNextGame ends

  export default MatchesAvailable
import { useState } from 'react';
import SelectPlatform from './SelectPlatform';
//controller
import platformController from "../controllers/platformController";
import gameController from "../controllers/gameController";
import typeController from "../controllers/typeController";
import matchController from '../controllers/matchController';
import inviteController from '../controllers/inviteController';
//css and icons
import { FiCalendar  } from 'react-icons/fi';
import { GiBaseballBat  } from 'react-icons/gi';
//components
import Searcher from './Searcher';

function MatchForm ({user, SecondaryButton, _platform, _game, _type }) {
  let [platform, setPlatform] = useState(_platform?_platform:'');
  let [game, setGame] = useState(_game?_game:'');
  let [type, setType] = useState(_type?_type:'');
  let [quantity, setQuantity] = useState('');
  let [checked, setChecked] = useState(false);
  let [invites, setInvites] = useState([]);

  function onChangePlatform(e) {
    this.setState({"selected":e.target.value});
    setPlatform(e.target.value);
  }

  function onChangeGame(e) {
    this.setState({"selected":e.target.value});
    setGame(e.target.value);
  }

  function onChangeType(e) {
    this.setState({"selected":e.target.value});
    setType(e.target.value);
  }

  async function sendInvites(id){
    try{
      const params = {
        match: id,
        players: invites,
        read: 0
      }
      const response = await inviteController.insertInvite(params);

      if(response.affectedRows > 0){
        alert("Invites sent sucessfully!");
      }else{
        alert("The invite couldn't be sent but the match was created successfully!");
      }

    }catch(e){
      alert("The invite couldn't be sent but the match was created successfully!");
    }

  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    let d = new Date();
    let formatted = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} `+
    `${d.getHours()}:${d.getMinutes()}:00`; 

    if(platform === 0 || game === "0" || type === "0" || quantity == "" ){
      alert("Please check all the values and try again!")
    }else{
      try{
        let params = {
            platform, 
            game, 
            type,
            quantity,
            time: formatted,
            email: user.email
          }
        
        matchController.insert(params, checked?sendInvites:undefined);
      }catch(e){
        alert("There was an unexpected issue with the system. Please contact technical support.");
      }
    }//ELSE ENDS
  };//handleSubmit ends

  return (
    <div className='match-container'>
      <form className='form' onSubmit={handleSubmit}>
        <div className='match-form'>
          <div className='row'>
            <div className='icon-container'><FiCalendar/></div>
          </div>
        <div className='row'>
          <div className='icon-container'>
            <GiBaseballBat/>
          </div>
          <SelectPlatform 
            onChangeSelect={onChangePlatform}
            fetch={platformController.requestPlatform}
            itemId={'id'}
            itemName={'name'}
            />
          </div>
          <div className='row'>
            <SelectPlatform 
              onChangeSelect={onChangeGame}
              fetch={gameController.request}
              itemId={'id'}
              itemName={'game'}
              />
          </div>
          <div className='row'>
            <SelectPlatform 
              onChangeSelect={onChangeType}
              fetch={typeController.request}
              itemId={'id'}
              itemName={'type'}
              />
          </div>
          <div className='row'>
            <input
              type='text'
              id='email'
              value={quantity}
              onChange={(e)=>{setQuantity(e.target.value)}}
            />
          </div>
          <div className='row'>
            <input 
            type="checkbox" 
            checked={checked} 
            onChange={()=>setChecked(checked?false: true)}/>
            <span>Send challenge</span>
          </div>
          <div className='row'>
            {checked? <Searcher onUpdate={setInvites} selected={invites}/>: null}
          </div>      
        <div className='row btn-container'>
          <button type='submit' className='btn btn-confirm'>
            Save
          </button>
          {SecondaryButton? <SecondaryButton/>: null}
        </div>

        </div>
      </form>
    </div>
  );
};//Login ends

export default MatchForm;

import React from "react";
// import MatchesAvailable from "../components/MatchesAvailable";
//controllers
import matchController from "../controllers/matchController";
//views
import GameView from "./state_view/GameView.js";
import WaitingView from "./state_view/WaitingView";
//components
import ResultForm from "../components/ResultForm";
import Timer from "../components/Timer";
//websocket
import { io } from "socket.io-client";

class CGamePage extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,//user logged in
      loading: true,//flag to show or hide loading icon
      match: {},//Current match
      mode: 'VIEW'
    };  

    //binding methods
    this.setReady = this.setReady.bind(this);
    this.cancelBet = this.cancelBet.bind(this);
    this.checkMode = this.checkMode.bind(this);
    this.isHost = this.isHost.bind(this);
    this.porroState = this.porroState.bind(this);
    //socket
    this.socket = io('http://localhost:4200');
    this.socket.on("result-submitted", (arg)=>{
      //The result was submitted from the server
      /* Check if the timer has finished. 
      If the timer finished then check the result and announce winner

      timer still going then alert the user the oponent has submitted 
      and once the timer finishes the result will be announced
      
      */
      
    }) 
  }

  componentDidMount(){
    this.checkCurrentGame();
  }
  //helper function to return an string representing the mode is in the this.state
  checkMode(match, directMode){ 
    
    if(directMode) return directMode

    if(match.hostReady && match.againstReady){//If Both are ready then the state is FINAL
      
      if(match.hostResult && this.isHost(match) ){ //CHECKING IF THE RESULTS HAS BEEN SUBMITTED
        console.log("if reino el resultado")
        return 'PRO-WAITING'
      }else if(match.againstResult && !this.isHost(match, this.state.user)){
        console.log("INSIDE THE ELSE IF")
        return 'PRO-WAITING'
      }
      return 'READY'
    }else if((this.isHost(match, this.state.user) && match.hostReady) || (!this.isHost(match, this.state.user) && match.againstReady)){//Check if the host or the against is ready
      return 'WAITING'
    }else{
      return 'VIEW'
    }
  }

  checkCurrentGame(){
    Promise.all([matchController.checkCurrent({user: this.state.user.id})])
    .then(async (response)=>{

      switch (response[0].status) {
        case 200:
          const result = await response[0].json();
          console.log(result[0])
          if(result.length > 0){
            this.setState({match: result[0], loading: false});
          }else{
            this.setState({loading: false});
          }
          
          break;
        default:
          console.log("inside of the default")
          break;
      }
      
    }).catch(()=>this.setState({loading: false}))
  }
  isHost(match){//takes in a match obj
    return match.hostId == this.state.user.id
  }

  async setReady(e){
    try{
      e.preventDefault();
      const matchId = this.state.match.match;
      const host = this.isHost(this.state.match);

      const params = {match: matchId, host: host};
      const response = await matchController.setReady(params);
      
      let stateObj; //declaring to use inside of the switch. Will contain the new state element to be set
      switch (response.status) {
        case 200:
          stateObj = {
            match: {...this.state.match},//destructure what is already inside of match
            mode: 'WAITING', 
            loading: false
          }
          if(host){
            stateObj.match.hostReady = 1;
          }else{
            stateObj.match.againstReady = 1;
          }
           
          this.setState(stateObj);
          break;
        case 220://Both of the players are ready
          stateObj = {
            match: {...this.state.match},//destructure what is already inside of match
            mode: 'READY', 
            loading: false
          }
          if(host){
            stateObj.match.hostReady = 1;
          }else{
            stateObj.match.againstReady = 1;
          }
          this.setState(stateObj);
          break;
        default:
          alert("The match was unable to start. Please try again or contact support.")
          this.setState({loading: false})
          break;
      }

    }catch(error){
      console.log("there was an error");
      console.log(error);
    }
  }

  async cancelBet(e){
    try{
      e.preventDefault();
      const matchId = this.state.match.match;
      const host = this.isHost(this.state.match);

      const params = {match: matchId, host: host};
      const response = await matchController.cancel(params);
      
      switch (response.status) {
        case 200:
          alert("The match was canceled. You can acept a new match!");
          this.setState({ match:{} ,mode: 'EMPTY', loading: false});
          break;
        default:
          alert("The match was not able to be canceled. Please try again or contact support.");
          this.setState({loading: false})
          break;
      }

    }catch(error){
      console.log("there was an error");
      console.log(error);
    }
  }

  porroState(){
    this.setState({mode: 'PRORROGA'});
  }

  renderView(){
    const mode = this.checkMode(this.state.match);
    let start = this.state.match.difference;

    switch (mode) {
      case 'VIEW':
        if(!this.state.match.hostId) return ("No match found");//IF STATE IS VIEW BUT NO MATCH IS FOUND (POSSIBLE BUG)
        return (<GameView 
                match={this.state.match} 
                onClickStart={this.setReady} 
                onClickCancel={this.cancelBet}/>)
      case 'WAITING':
          /*  have to set up websocket to keep checking if the game was accepted  */

          

        return (<div>WAITING shit</div>)
      case 'READY':
        return (<><ResultForm match={this.state.match} user={this.state.user} setState={this.porroState}/> <Timer match={this.state.match} user={this.state.user} startTime={start > 1? 1: start}/></>)
      case 'PRO-WAITING':
        return (<><ResultForm match={this.state.match} user={this.state.user} setState={this.porroState}/><WaitingView /><Timer match={this.state.match} user={this.state.user} startTime={start > 1? 1: start} /></>)
      default:
        return (<GameView 
          match={this.state.match} 
          onClickStart={this.setReady} 
          onClickCancel={this.cancelBet}/>)
    }
  }

  render(){

    return(
      <div className="welcome">
        <p className="welcome-p">Current game page</p>
        <div className={`${this.state.loading?'loading': ''}`}>
          {
            this.renderView()
          }
        </div>
      </div>
    );
  };//render ends
};

export default CGamePage;

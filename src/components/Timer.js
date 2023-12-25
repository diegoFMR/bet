import React from "react";
import matchController from '../controllers/matchController';
/*  
required props:
  startTime Integer
  stopInterval callback 
  startTimer callback
  heckResults callback

*/
class Timer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            interval: null,
            minutes: props.startTime,
            seconds: Math.floor(props.startTime / 10),
        }
        //non state props
        this.match = props.match;
        this.user = props.user;
        //binding functions
        this.timerFunction = this.timerFunction.bind(this);
        this.stopInterval = this.stopInterval.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.checkResults = this.checkResults.bind(this);
    }; 

    componentDidMount(){
        this.startTimer();
    }
    componentWillUnmount(){
        this.stopInterval();
    }
    
    startTimer(){
        this.setState({ interval: setInterval(this.timerFunction, 1000)});
    }

    isHost(match, user){//takes in a match obj
        return match.hostId == user.id
    }

    timerFunction() {

        //timer finished. fire finish function
        if(this.state.seconds == 0 && this.state.minutes == 0){
            console.log("the timer finished");
            this.stopInterval();
            this.checkResults();
        }

        let newState;
  
        //Check if a minute has passed
        if(this.state.seconds == 0){
            newState = {
                minutes: this.state.minutes - 1,
                seconds: 60
            }
        }else{
            newState = {
                minutes: this.state.minutes,
                seconds: this.state.seconds - 1
            }
        }

        this.setState(newState);
    };

    stopInterval(){
        clearInterval(this.state.interval);
    }

    async checkResults(){
        try{
          const params = {
            match: this.match.match
          };
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
            if(r.hostWon && isHost(this.match, this.user)){
              alert("Congratulations, you have won!");
              const params2 = { email: this.user.email , match: this.match.match }
          const response2 = await matchController.setWinner(params2);
          console.log(response2);
            }else if(!r.hostWon && !isHost(this.match, this.user)){
              alert("Congratulations, you have won!");
              const params2 = { email: this.user.email , match: this.match.match }
          const response2 = await matchController.setWinner(params2);
          console.log(response2);
            }else{
              alert("You opponent has won. Better luck next time!");
            }
            break;
          case 220:
            r = await response.json();
            if(r.hostWon && this.isHost(this.match, this.user)){
              alert("Congratulations, you have won!");
              const params2 = { email: this.user.email , match: this.match.match }
          const response2 = await matchController.setWinner(params2);
          console.log(response2);
            }else if(!r.hostWon && !this.isHost(this.match, this.user)){
              alert("Congratulations, you have won!");
              const params2 = { email: this.user.email , match: this.match.match }
          const response2 = await matchController.setWinner(params2);
          console.log(response2);
            }else{
              alert("You opponent has won. Better luck next time!");
            }
            break;
          case 230:
            alert("Your results and your opponent's do not match. Please input the result again.");
            break;
          case 403:
            alert("You and your oponent have not input a result yet!");
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

    render(){
        return ( 
            <div>
            Time clocking [<span id="timer">{this.state.startTime} </span>] <div onClick={this.stopInterval}>Lil bitch stop it</div>
            <p>Minutes:{this.state.minutes} </p> <p>Seconds: {this.state.seconds}</p>
            </div>
          );
    } 
  };
  
  export default Timer;
  
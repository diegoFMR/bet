import React from "react";
//components
import MatchForm from "../components/MatchForm";
import Modal from "../components/Modal";
import MatchesAvailable from "../components/MatchesAvailable";
//controllers
import matchController from "../controllers/matchController";

class WelcomePage extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      nextGames: [],
      openModal: false,
      mode: 'VIEW',
      matchProps: {},
      eliminateId: undefined,
      loading: true
    };  

    //binding methods
    this.confirmDelete = this.confirmDelete.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.onAccept = this.onAccept.bind(this);
  }

  componentDidMount(){
    this.listGames();
  }

  listGames(){
    Promise.all([matchController.findAvailableGames(this.state.user.email)])
    .then((results)=>{
      this.setState({matches: results[0], mode: 'VIEW', openModal: false, loading: false});
    }).catch(()=>this.setState({loading: false}))
  }

  confirmDelete(){
    matchController.deleteMatch(this.state.eliminateId)
      .then(this.listGames());
  }

  cancelModal(){
    this.setState({openModal: false});
  }

  cancelEdit(e){
    e.preventDefault();
    this.setState({mode: 'VIEW'})
  }
  
  async onAccept(match){
    if(window.confirm("You will have 1 hour to add the oponent via Discord and to schedule match, are you sure you want to continue?")){
      const params = {
        match: match,
        against: this.state.user.id
  
      }
      try{
        const response = await matchController.setAgaints(params);

        if(response.currentLive){
          response.json.then(r=>{
            //check if the user is the host or the against
            if(r[0].host == this.state.user.id){
              alert("One player has accepted one of your bet. Please check the current game tab and finish that game before accepting another one. If you do not have a current game active, please contact suppport.");
            }else{
              alert("Please finish you current game before accepting another. If you do not have a current game active, please contact suppport.");
            }
            
          });
          
        }else if(response.affectedRows > 0){
        alert("Bet accepted successfully!")
        }else{
          alert("There was an issue with the request. Please contact support or try again");
        }
      }catch(e){
        console.log(e);
        alert("There was an issue with the request. Please contact support or try again");
      }
    }
    

  }


  render(){
    let show;
    if(this.state.mode === 'VIEW'){
      show = <MatchesAvailable data={this.state.matches} onEdit={this.editMode} onAccept={this.onAccept} />;
    }else if(this.state.mode === 'EDIT'){
      show = <MatchForm {...this.state.matchProps}/> //_team, _stadium, _date
    }

    return(
      <div className="welcome">
        <p className="welcome-p">Welcome back {this.state.user.name}</p>
        <div className={`${this.state.loading?'loading': ''}`}>
          {this.state.mode === 'VIEW'? this.state.loading? 'Loading...':<p>Match availables</p>: null}
          {this.state.loading?null:show}

          <Modal
            tittle={'Are you sure that you want to delete this game?'}
            openModal={this.state.openModal}
            confirmClick={this.confirmDelete}
            cancelClick={this.cancelModal}
          />
        </div>
      </div>
    );
  };//render ends
};

export default WelcomePage;

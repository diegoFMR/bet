import MatchForm from "../components/MatchForm";

function MatchPage ({user}) {
  
  return (
    <div className='match-container'>
        <h5>Create a match</h5>
        <MatchForm user={user} _ignoreId={user.team_id}/>
    </div>
  );
};//Login ends

export default MatchPage;

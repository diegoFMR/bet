import React from "react";
//controllers
import stadiumController from "../controllers/stadiumController.js";

class SelectStadium extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      stadiumSelected: props.initialValue? props.initialValue: "0",
      stadiumList: [],
      loading: true
    };

    this.id = props.id;

    this.onChange = props.onChange.bind(this);
  }

  componentDidMount(){
      Promise.all([stadiumController.listStadiums()]).then((data)=>{
        this.setState({ "stadiumList": data[0], loading: false});
      });
  }

  showList(array){
    let results = [];

    if(array){
      results = array.map((item)=>{
        return (
          <option value={item.stadium_id} key={item.stadium_id}> {item.name} </option>
        )
      })//map ends
    } 

    return results;
  }

  render(){
    return(
        <div className={`${this.state.loading? 'loading':''}`}>
          <select 
            id={this.id}
            value={this.state.stadiumSelected} 
            onChange={this.onChange}
          >
            <option value="0"> 
            {this.state.loading? "Loading...": 
                this.state.stadiumList ? "Please select one item..." : "No items found..." 
              }
            </option>
            {this.showList(this.state.stadiumList)}
          </select>
        </div>
        
    );
  };//render ends
};
export default SelectStadium;

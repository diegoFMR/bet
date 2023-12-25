// import { useState } from 'react';
import React from "react";
//controllers


class SelectPlatform extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      selected: props.initialValue? props.initialValue: "0",
      list: [],
      fetchFunction: props.fetch,
      itemId: props.itemId,
      itemName: props.itemName,

      // platformSelected: props.initialValue? props.initialValue: "0",
      // platformList: [],
      loading: true,
    };

    this.id = props.id;
    
    this.onChangeSelect = props.onChangeSelect.bind(this);
  }

  componentDidMount(){
    Promise.all([this.state.fetchFunction()]).then((data)=>{
      this.setState({ "list": data[0], loading: false});
    });
  }//componentDidMount end

  showList(array){
    
    let results = [];
    
    if(array){
      results = array.map((item)=>{  
        return (
          <option value={item[this.state.itemId]} key={item[this.state.itemId]}> {item[this.state.itemName]} </option>
        )
      })//map ends
    }

    return results;
  }

  render(){
    return(
        <div className={`select-container form-input ${this.state.loading? 'loading':''}`}>
          <select 
            id={this.id}
            value={this.state.selected} 
            onChange={this.onChangeSelect}
          >
            <option value="0" className="loading">
               {this.state.loading? "Loading...": 
                  this.state.list ? "Please select one item..." : "No items found..." 
                }
            </option>
            {this.showList(this.state.list)}
          </select>
        </div>
        
    );
  };//render ends
};
export default SelectPlatform;

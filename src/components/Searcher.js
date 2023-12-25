import React from "react";
import loginController from "../controllers/loginController";
//css
import "./../style/search.css";
//components
import { GrAddCircle  } from 'react-icons/gr';
import { TiDeleteOutline  } from 'react-icons/ti';

class Searcher extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            search: '',
            data: [],
            //Search properties
            counter: 0,//typing counter
            steps: props.steps? props.steps: 2 
        };
    }
    //where e = event,  obj = json to manipulate, add = boolean to add or delete action
    update(e, obj, action){
      //find the value dinamically and deleting or adding it
        let found = this.props.selected.findIndex(element=>element.id == obj.id);
         //You can add new cases for 
         switch(action) {
            case "add":
               if(found == -1){//if its not found in the array
                                 //firing update function with new array
                  this.props.onUpdate([...this.props.selected, obj]);
               }
              break;
            case "delete"://create a new array, delete the obj found
               const newArray = [...this.props.selected]
               newArray.splice(found, 1);
               //firing update function with new array
               this.props.onUpdate(newArray); 
              break;
            default:   
          }
    }

    async changeEvent(e){
        this.setState({search: e.target.value});
        this.state.counter++;
        if(this.state.counter == this.state.steps){
            try{
                const res = await loginController.getByName(this.state.search);
                this.setState({data: res});
            }catch(e){
                console.log('error');
            }
            
            this.state.counter = 0;//reset counter
        }
    }

    render(){
        return(
            <div>
                <input 
                type="text" 
                className="searcher"
                value={this.state.search}
                onChange={(e)=>this.changeEvent(e)}
                />
                <div className="values-container">
                    <div className="input-container">
                        {
                            this.state.data.map(element=>{
                                return(
                                    <div className="search-option" key={element.id} >
                                       <div 
                                          className="add-container"
                                          onClick={(event)=>this.update(event,element,'add')}>
                                        <GrAddCircle />
                                       </div>                                
                                     <span>{element.name}</span>
                                    </div>
                                   
                                );
                            })
                        }
                    </div> 
                    <div className="options-container">
                        OPTIONS
                    { 
                        this.props.selected.map(element=>{
                            return (
                                <div className="option-selected" key={element.id}>
                                 <div onClick={(event)=>this.update(event,element,'delete')}><TiDeleteOutline/></div>
                                 <span>{element.name}</span><div ></div>
                                </div>
                            )
                        })
                    }    
                    </div>   
                </div>
            </div>
            
        );
    }//render ends
}
export default Searcher;
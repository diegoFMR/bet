import React from "react";

class Button extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            icon: props.icon, 
            text: props.text, 
            classs: props.classs, 
            disabled: props.disabled, 
            type: props.type, 
            onClick: props.onClick
        };
    }

    render(){
        return(
            <button 
                type={this.state.type} 
                className={this.state.classs}
                disabled={this.state.disabled? true: false}
                onClick={this.state.onClick}
            >
                {this.state.icon?<this.state.icon/>: this.state.text} 
            </button>
        );
    }//render ends
}
export default Button;
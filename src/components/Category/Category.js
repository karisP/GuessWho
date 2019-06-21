import React, { Component } from 'react';
import classes from './Category.module.css';

class Category extends Component {
    constructor(props){
        super(props);
        this.state={
            
        }
    }


    render() {
        return(
            <div className={classes.category} onClick={this.props.onClick}>
              <p className={classes.title}>{this.props.title}</p>
              {this.props.id === this.props.selectedId ?
                  this.props.hide?
                  "":
                  this.props.buttons.map((button, index) => {
                
                      return(
                          <button 
                            type='button' 
                            key={index} 
                            value={button.text} 
                            onClick={()=>this.props.handleAttribute(`${button.text}`)}>
                            {button.text}
                          </button> 
                          )
                  })
                 
                 : ""     
              } 
            
          </div>
      )
  }
}

export default Category;

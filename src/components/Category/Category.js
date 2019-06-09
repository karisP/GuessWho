import React from 'react';
import classes from './Category.module.css';

const Category = (props) => {
    return(
        <div className={classes.category}>
            <h3><span onClick={props.onClick}>+</span>{props.title}</h3>
            {props.id === props.selectedId ?
                props.hide?
                "":
               props.buttons.map((button, index) => {
                return(
                   <button type='button' key={index}>{button.text}</button> 
                 )
                })
               
               : ""     
            }
          
        </div>
    )
}

export default Category;

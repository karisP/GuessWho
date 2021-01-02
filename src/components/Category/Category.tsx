import * as React from 'react';
import classes from './Category.module.css';

interface IProps {
  onClick: () => void;
  handleAttribute: (text: string) => void;
  title: string;
  id: number;
  selectedId: number | undefined;
  hide: boolean;
  buttons: { text: string }[];

}

const Category = (props: IProps) => {
  return (
    <div className={classes.category} onClick={props.onClick}>
      <p className={classes.title}>{props.title}</p>
      {props.id === props.selectedId ?
        props.hide ?
          "" :
          props.buttons.map((button, index) => {

            return (
              <button
                type='button'
                key={index}
                value={button.text}
                onClick={() => props.handleAttribute(`${button.text}`)}>
                {button.text}
              </button>
            )
          })

        : ""
      }

    </div>
  )

}

export default Category;

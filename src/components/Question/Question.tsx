import React, { useEffect, useRef } from 'react';
import classes from './Question.module.css';
import { ICharacter } from '../../App';
import styles from '../Chat/Chat.module.css';
//import Chatbox from '../Chat/Chatbox';

interface IProps{
    character: ICharacter | null;
    onWin: (win: boolean) => void;
    win: boolean | null;
    onCountQuestions: () => void;
}

interface ICategory{
    id: number,
    questionId: number,
    title: string,
    attributes: string[],
}

interface IMessage{
    message: string;
    fromUser: boolean;
}

const categories = [{ id: 0, questionId: 0 ,title: "Hair Color", attributes: ["Blonde", "Brown", "Black", "Red", "Gray"]},
{ id: 1, questionId: 1 , title: "Accessories", attributes: ["Glasses", "Hat"] },
{ id: 2, questionId: 2, title: "Age", attributes: ["Child", "Adult" , "Advanced"]}, 
{ id: 3, questionId: 3, title: "Gender", attributes: ["Male", "Female", "Other"]},
{ id: 4, questionId: 4, title: "Species", attributes: ["Wizard", "Animal", "Muggle", "Squib"]},
{ id: 5, questionId: 6, title: "Role", attributes: ["Staff", "Student", "Servant"]},
{ id: 6, questionId: 5, title: "Facial Hair", attributes: ["Yes", "No"]},
{ id: 7, questionId: 4, title: "House", attributes: ["Griffindor", "Slytherin", "Ravenclaw", "Hufflepuff"]},
{ id: 8, questionId: 0, title: "Hair Length", attributes: ["Long", "Medium", "Short", "Bald"]},
{ id: 9, questionId: 0, title: "Hair Texture", attributes: ["Straight", "Curly", "Feathers"]},
{ id: 10, questionId: 6, title: "Defining Feature", attributes: ["Eye", "Nose", "Beak", "Ears"]}
];

const questions = (category: ICategory, attribute: string) => [
  `Does my character have ${attribute} ${category.title.toLocaleLowerCase()}?`,
  `Does my character wear ${attribute}?`,
  `Is my character ${attribute}?`,
  `Is my character of the ${attribute} ${category.title.toLowerCase()}?`,
  `Is my character a ${attribute}?`,
  `Does my character have ${category.title.toLowerCase()}?`,
  `Is my character's ${category.title.toLowerCase()} a ${attribute}?`,
];

const Question = (props: IProps) => {
    
    const chatEl = useRef<HTMLDivElement | null>(null);
    const [selectedCategory, setSelectedCategory] = React.useState<ICategory | undefined>();
    const [finalAnswer, setFinalAnswer] = React.useState<string>("");
    const [messageState, setMessageState] = React.useState<IMessage[]>([{message: "Hello student, please select from the below categories and attributes to ask me questions.", fromUser: false}]);

    const addMessagetoState = (message: string, fromUser: boolean) => {
        setMessageState(prevState => (
             [...prevState, {message: message, fromUser: fromUser}]
          ))
    }

    const onChangeCategory = (e: React.FormEvent<HTMLSelectElement>) => {
        setSelectedCategory(categories[parseInt(e.currentTarget.value)]);
    }

    const onChangeAttribute = (e: React.FormEvent<HTMLSelectElement>) => {
        if(selectedCategory){
            addMessagetoState(questions(selectedCategory,e.currentTarget.value.toLowerCase())[selectedCategory.questionId], true);
        }
        submitQuestion(e.currentTarget.value.toLowerCase());
    }

    const submitQuestion = (attribute: string) => {
        props.onCountQuestions();
        let response = undefined;
        if(props.character && attribute && selectedCategory){
            if(selectedCategory.id === 0){
                response = attribute === props.character.hairColor;
            }else if(selectedCategory.id === 1){
                response = attribute === props.character.accessory;
            } else if(selectedCategory.id === 2){
                response = attribute === props.character.age;
            } else if(selectedCategory.id === 3){
                response = attribute === props.character.gender;
            } else if(selectedCategory.id === 4){
                response = attribute === props.character.species;
            } else if(selectedCategory.id === 5){
                response = attribute === props.character.role;
            } else if(selectedCategory.id === 6){
                response = props.character.facialHair;
            } else if(selectedCategory.id === 7){
                response = attribute === props.character.house;
            } else if(selectedCategory.id === 8){
                response = attribute === props.character.hairLength;
            } else if(selectedCategory.id === 9){
                response = attribute === props.character.hairType;
            } else if(selectedCategory.id === 10){
                response = attribute === props.character.definingFeature;
            }
        }

        response !== undefined ?
            response === true ?
                setTimeout(() => addMessagetoState("Yes", false), 3000)
                :
                setTimeout(() => addMessagetoState("No", false), 3000)
            :
            setTimeout(() => addMessagetoState("I don't know", false), 3000);
    }

    const onChangeFinal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFinalAnswer(e.currentTarget.value);
    }

    const onSubmitFinal = () => {
        addMessagetoState(finalAnswer, true);
        if(props.character && (finalAnswer.toLowerCase() === props.character.name.toLowerCase())){
            props.onWin(true);
        }else{
            props.onWin(false);
            addMessagetoState("Try again", false);
        }
    }

    //autoscroll chat component
    useEffect(() => {
        if (chatEl.current) {
          chatEl.current.addEventListener('DOMNodeInserted', event => {
            let target = event.currentTarget as HTMLDivElement;
            if(target) target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
          });
        }
      }, []);

        return (
            <div className={classes.Question}>
                <div className={classes.header}><span className={classes['hat-image']}></span>Hat Chat</div>
                <div className={styles.Chat} ref={chatEl}>
                    {messageState ? messageState.map((m,key) => (
                    <div key={key} className={!m.fromUser ? styles.chatbox : styles['user-chatbox']}>
                        {m.message}
                   </div>
                    )): null}                    
                </div>                       
                <div className={classes.questions}>
                    <div>
                        <select onChange={(e) => onChangeCategory(e)}>
                            <option hidden>Categories</option>
                            {categories.map(category => {
                                return(<option key={category.id} value={category.id}>{category.title}</option>)
                            })}
                        </select>
                        <select onChange={(e) => onChangeAttribute(e)}>
                            <option hidden>Attributes</option>
                            {selectedCategory ? categories[selectedCategory.id].attributes.map(attribute => {
                                return(<option key={attribute} value={attribute}>{attribute}</option>)
                            }) : <option>Select category first</option>}
                        </select>
                    </div>
                    <div>
                        <input placeholder="Enter your final guess" value={finalAnswer} onChange={(e) => onChangeFinal(e)}></input>
                        <button type="button" onClick={onSubmitFinal}>Submit</button>
                    </div>
                </div>
            </div>
        )

    }

export default Question;

import React, { useEffect, useRef } from 'react';
import classes from './Question.module.css';
import { ICharacter } from '../../App';
import styles from '../Chat/Chat.module.css';
import Chatbox from '../Chat/Chatbox';

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

const Question = (props: IProps) => {
    
    const chatEl = useRef<HTMLDivElement | null>(null);
    const [selectedCategory, setSelectedCategory] = React.useState<ICategory | undefined>();
    const [selectedAttribute, setSelectedAttribute] = React.useState<string | null>(null);
    const [response, setResponse] = React.useState<boolean | undefined>();
    const [finalAnswer, setFinalAnswer] = React.useState<string>("");
    const [messages, setMessages] = React.useState<IMessage[]>(
        [{message: "Hello student, please select from the below categories and attributes to ask me questions.", fromUser: false}]
        );
    let latestMessagesRef = useRef(messages);
    useEffect(() => {
        latestMessagesRef.current = messages;
      });
    // useEffect(() => {
    //     function tick() {
    //         // Read latest props at any time
    //         console.log(latestMessagesRef.current);
    //       }
      
    //       setInterval(tick, 5000);
    // })

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
  ]

  const questions = [
    `Does my character have ${selectedAttribute} ${selectedCategory ? selectedCategory.title.toLocaleLowerCase() : ''}?`,
    `Does my character wear ${selectedAttribute}?`,
    `Is my character ${selectedAttribute}?`,
    `Is my character of the ${selectedAttribute} ${selectedCategory ? selectedCategory.title.toLowerCase() : ''}?`,
    `Is my character a ${selectedAttribute}?`,
    `Does my character have ${selectedCategory ? selectedCategory.title.toLowerCase() : ''}?`,
    `Is my character's ${selectedCategory ? selectedCategory.title.toLowerCase() : ''} a ${selectedAttribute}?`,
]

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setMessages([...messages, {message: "No", fromUser: false}])
    //      }, 3000);
     
    //     return () => clearTimeout(timeout);
    //    },[]);

    const addMessagetoState = (message: string, fromUser: boolean, delay: boolean) => {
        //console.log("addMessagetoState", delay);
            setMessages([...messages, {message: message, fromUser: fromUser}]);
    }

    // const delayedMessagetoState = (message: string, fromUser: boolean, delay: boolean) => {
    //     console.log("delayedMessage", [...messages], delay);
    //     const timeout = setTimeout(() => setMessages([...messages, {message: message, fromUser: fromUser}]), 3000);
    //     return () => clearTimeout(timeout);
    // }

    const onChangeCategory = (e: React.FormEvent<HTMLSelectElement>) => {
        if(selectedAttribute) setSelectedAttribute(null);
        setSelectedCategory(categories[parseInt(e.currentTarget.value)]);
    }

    const onChangeAttribute = (e: React.FormEvent<HTMLSelectElement>) => {
        setSelectedAttribute(e.currentTarget.value.toLowerCase());
        if(selectedCategory){
            console.log("selectedCategory and change attribute");
            addMessagetoState(questions[selectedCategory.questionId], true, false);
        }
        submitQuestion();
    }
    //console.log(messages);

    const submitQuestion = () => {
        props.onCountQuestions();
        if(props.character && selectedAttribute && selectedCategory){
            if(selectedCategory.id === 0){
                setResponse(selectedAttribute.toLowerCase() === props.character.hairColor);
            }else if(selectedCategory.id === 1){
                setResponse(selectedAttribute.toLowerCase() === props.character.accessory)
            } else if(selectedCategory.id === 2){
                setResponse(selectedAttribute.toLowerCase() === props.character.age);
            } else if(selectedCategory.id === 3){
                setResponse(selectedAttribute.toLowerCase() === props.character.gender);
            } else if(selectedCategory.id === 4){
                setResponse(selectedAttribute.toLowerCase() === props.character.species);
            } else if(selectedCategory.id === 5){
                setResponse(selectedAttribute.toLowerCase() === props.character.role);
            } else if(selectedCategory.id === 6){
                setResponse(props.character.facialHair);
            } else if(selectedCategory.id === 7){
                setResponse(selectedAttribute.toLowerCase() === props.character.house);
            } else if(selectedCategory.id === 8){
                setResponse(selectedAttribute.toLowerCase() === props.character.hairLength);
            } else if(selectedCategory.id === 9){
                setResponse(selectedAttribute.toLowerCase() === props.character.hairType);
            } else if(selectedCategory.id === 10){
                setResponse(selectedAttribute.toLowerCase() === props.character.definingFeature);
            }
        }
        response === true ? setTimeout(() => addMessagetoState("Yes", false, true), 3000) : setTimeout(() => addMessagetoState("No", false, true),3000);
    }

    const onChangeFinal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFinalAnswer(e.currentTarget.value);
    }

    const onSubmitFinal = () => {
        addMessagetoState(finalAnswer, true, false);
        if(props.character && (finalAnswer.toLowerCase() === props.character.name.toLowerCase())){
            props.onWin(true);
        }else{
            props.onWin(false);
            addMessagetoState("Try again", false, true);
        }
    }

    useEffect(() => {
        if (chatEl.current) {
          chatEl.current.addEventListener('DOMNodeInserted', event => {
            let target = event.currentTarget as HTMLDivElement;
            //const { currentTarget: target } = event;
            if(target) target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
          });
        }
      }, [])

        return (
            <div className={classes.Question}>
                <div className={classes.header}><span className={classes['hat-image']}></span>Hat Chat</div>
                <div className={styles.Chat} ref={chatEl}>
                    {messages.map((m,key) => (
                    <div key={key}>
                        <Chatbox
                        message={m.message}
                        fromUser={m.fromUser}
                        /> 
                   </div>
                    ))}                    
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

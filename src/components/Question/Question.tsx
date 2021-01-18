import React from 'react';
import classes from './Question.module.css';
import Chat from '../Chat/Chat';
import { ICharacter } from '../../App';

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

interface IQuestion{
    category: ICategory;
    attribute: string;
    question: string;
    response: boolean;
    finalAnswer: string | null;
}

const Question = (props: IProps) => {
    const [selectedCategory, setSelectedCategory] = React.useState<ICategory | undefined>();
    const [selectedAttribute, setSelectedAttribute] = React.useState<string | null>(null);
    const [submittedQuestion, setSubmittedQuestion] = React.useState<string | null>(null);
    const [response, setResponse] = React.useState<boolean | undefined>();
    const [finalAnswer, setFinalAnswer] = React.useState<string>("");
    const submittedQuestions: IQuestion[] = [];

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

    const onChangeCategory = (e: React.FormEvent<HTMLSelectElement>) => {
        if(selectedAttribute) setSelectedAttribute(null);
        if(submittedQuestion) setSubmittedQuestion(null);
        setSelectedCategory(categories[parseInt(e.currentTarget.value)]);
    }
    const onChangeAttribute = (e: React.FormEvent<HTMLSelectElement>) => {
        if(submittedQuestion) setSubmittedQuestion(null);
        setSelectedAttribute(e.currentTarget.value.toLowerCase());
    }

    const submitQuestion = (attribute: string) => {
        setSubmittedQuestion(attribute);
        props.onCountQuestions();
        console.log(submittedQuestion);
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
    {/*Begin keeping a history of the submitted questions to map through */}
        if(selectedAttribute && selectedCategory && submittedQuestion && response)
        submittedQuestions.push({attribute: selectedAttribute, category: selectedCategory, question: submittedQuestion, response: response, finalAnswer: finalAnswer })
    }
    
    console.log(submittedQuestions);
    const clearQuestion = () => {
        setSelectedAttribute(null);
        setSelectedCategory(undefined);
        setSubmittedQuestion(null);
    }
    const onChangeFinal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFinalAnswer(e.currentTarget.value);
    }

    const onSubmitFinal = () => {
        if(props.character && (finalAnswer.toLowerCase() === props.character.name.toLowerCase())){
            props.onWin(true);
        }else{
            props.onWin(false);
        }
    }
        return (
            <div className={classes.Question}>
                <div className={classes.header}><span className={classes['hat-image']}></span>Hat Chat</div>                       
                <Chat
                    attribute={selectedAttribute}
                    category={selectedCategory} 
                    submitQuestion={submitQuestion}
                    clearQuestion={clearQuestion}
                    answer={response}
                    submittedQuestion={submittedQuestion}
                    onSubmitFinal={onSubmitFinal}
                    onChangeFinal={onChangeFinal}
                    finalAnswer={finalAnswer}
                    win={props.win}
                    />
                <div className={classes.questions}>
                    <div>
                        <select onChange={(e) => onChangeCategory(e)}>
                            <option value={''}>Categories</option>
                            {categories.map(category => {
                                return(<option value={category.id}>{category.title}</option>)
                            })}
                        </select>
                        <select onChange={(e) => onChangeAttribute(e)}>
                            <option value={''}>Attributes</option>
                            {selectedCategory ? categories[selectedCategory.id].attributes.map(attribute => {
                                return(<option value={attribute}>{attribute}</option>)
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

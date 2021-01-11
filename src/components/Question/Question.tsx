import React from 'react';
import classes from './Question.module.css';
// import Category from '../Category/Category';
import Chat from '../Chat/Chat';
import { ICharacter } from '../../App';

interface IProps{
    character: ICharacter | null;
    onWin: (win: boolean) => void;
    win: boolean | null;
}

interface ICategory{
    id: number,
    questionId: number,
    title: string,
    attributes: string[],
}

const Question = (props: IProps) => {
    const [selectedCategory, setSelectedCategory] = React.useState<ICategory | undefined>();
    const [selectedAttribute, setSelectedAttribute] = React.useState<string | null>(null);
    // const [hidden, setHidden] = React.useState<boolean>(true);
    const [submittedQuestion, setSubmittedQuestion] = React.useState<string | null>(null);
    const [response, setResponse] = React.useState<boolean | undefined>();
    const [finalAnswer, setFinalAnswer] = React.useState<string>("");

//     const categories = [{ id: 0, questionId: 0 ,title: "Hair Color", buttons: [{ text: "Blonde" }, { text: "Brown" }, { text: "Black" }, { text: "Red" }, { text: "Gray" }]},
//     { id: 1, questionId: 1 , title: "Accessories", buttons: [{ text: "Glasses" }, { text: "Hat" }] },
//      { id: 2, questionId: 2, title: "Age", buttons: [{ text: "Child" }, { text: "Adult" }, { text: "Advanced" } ]}, 
//      { id: 3, questionId: 3, title: "Gender", buttons: [{ text: "Male" }, { text: "Female" }, { text: "Other" }]},
//      { id: 4, questionId: 4, title: "Species", buttons: [{ text: "Wizard" }, { text: "Animal" }, { text: "Muggle" }, {text: "Squib"}]},
//      { id: 5, questionId: 6, title: "Role", buttons: [{ text: "Staff" }, { text: "Student" }, {text:"Servant"}]},
//      { id: 6, questionId: 5, title: "Facial Hair", buttons: [{ text: "Yes" }, { text: "No" }]},
//      { id: 7, questionId: 4, title: "House", buttons: [{ text: "Griffindor" }, { text: "Slytherin" }, { text: "Ravenclaw" }, {text: "Hufflepuff"}]},
//      { id: 8, questionId: 0, title: "Hair Length", buttons: [{ text: "Long" }, { text: "Medium" }, { text: "Short" }, {text: "Bald"}]},
//      { id: 9, questionId: 0, title: "Hair Texture", buttons: [{ text: "Straight" }, { text: "Curly" }, { text: "Feathers" }]},
//      { id: 10, questionId: 6, title: "Defining Feature", buttons: [{ text: "Eye" }, { text: "Nose" }, { text: "Beak" }, {text: "Ears"}]}
//    ]

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
    // const isSelected = (category : ICategory) => {
    //     setSelectedCategory({ id: category.id, title: category.title, questionId: category.questionId, attributes: category.attributes});
    // }

    // const toggleCategory = () => {
    //     setHidden(!hidden);
    // }

    // const handleAttribute = (text: string) => {
    //     setSelectedAttribute(text);
    //     console.log(selectedAttribute);
    // }
    const onChangeCategory = (e: React.FormEvent<HTMLSelectElement>) => {
        if(selectedAttribute) setSelectedAttribute(null);
        if(submittedQuestion) setSubmittedQuestion(null);
        setSelectedCategory(categories[parseInt(e.currentTarget.value)]);
    }
    const onChangeAttribute = (e: React.FormEvent<HTMLSelectElement>) => {
        if(submittedQuestion) setSubmittedQuestion(null);
        setSelectedAttribute(e.currentTarget.value);
    }

    const submitQuestion = (attribute: string) => {
        setSubmittedQuestion(attribute);
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
    }

    const clearQuestion = () => {
        setSelectedAttribute(null);
        setSelectedCategory(undefined);
        //setHidden(true);
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
                <p>Ask Me a Question</p>
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
                {/* {categories.map((category, id) => {
                    return (
                    <Category
                        key={id}
                        id={id} 
                        title={category.title} 
                        buttons={category.buttons} 
                        onClick={() => {isSelected(category); toggleCategory();}} 
                        hide={hidden} 
                        selectedId={selectedCategory ? selectedCategory.id : undefined}
                        handleAttribute={handleAttribute}
                        />
                    )
                })
                } */}

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
            </div>
        )

    }

export default Question;

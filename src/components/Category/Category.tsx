export interface ICategory{
  id: number,
  questionId: number,
  title: string,
  attributes: string[],
}

export const categories = [{ id: 0, questionId: 0 ,title: "Hair Color", attributes: ["Blonde", "Brown", "Black", "Red", "Gray"]},
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


export interface ICategory{
  id: number,
  title: string,
  attributes: {title: string, questionId: number}[],
}

export const categories = [{ id: 0,title: "Hair Color",
 attributes: [{title:"Blonde", questionId: 0}, {title:"Brown", questionId: 0},{title:"Black", questionId: 0}, {title:"Red", questionId: 0}, 
 {title:"Gray", questionId: 0}]},
{ id: 1, title: "Accessories", attributes: [{title:"Glasses", questionId: 1}, {title:"Hat", questionId: 1}] },
{ id: 2, title: "Age", attributes: [{title:"Child", questionId: 4},{title:"Adult", questionId: 2},{title:"Advanced", questionId: 2}]}, 
{ id: 3, title: "Gender", attributes: [{title:"Male", questionId: 4},{title:"Female", questionId: 4},{title:"Other", questionId: 3}]},
{ id: 4, title: "Species",
 attributes: [{title:"Wizard", questionId: 4},{title:"Animal", questionId: 3},{title:"Muggle", questionId: 4},{title:"Squib", questionId: 4}]},
{ id: 5, title: "Role",
 attributes: [{title:"Staff", questionId: 4},{title:"Student", questionId: 4},{title:"Servant", questionId: 4}]},
{ id: 6, title: "Facial Hair", attributes: [{title:"Yes", questionId: 5},{title:"No", questionId: 5}]},
{ id: 7, title: "House",
 attributes: [{title:"Griffindor", questionId: 4},{title:"Slytherin", questionId: 4},{title:"Ravenclaw", questionId: 4},{title:"Hufflepuff", questionId: 4}]},
{ id: 8, title: "Hair Length",
 attributes: [{title:"Long", questionId: 0},{title:"Medium", questionId: 0},{title:"Short", questionId: 0},{title:"Bald", questionId: 6}]},
{ id: 9, title: "Hair Texture",
 attributes: [{title:"Straight", questionId: 0},{title:"Curly", questionId: 0},{title:"Feathers", questionId: 0}]},
{ id: 10, title: "Defining Feature",
 attributes: [{title:"Eye", questionId: 7},{title:"Nose", questionId: 7},{title:"Beak", questionId: 7},{title:"Ears", questionId: 7}]}
];


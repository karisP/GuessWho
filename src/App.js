import React, { Component } from 'react';
import './App.css';
import Character from './components/Character/Character';
import Question from './components/Question/Question';
//import Chat from './components/Chat/Chat';
import harry from './images/harry.jpg';
import hermione from './images/hermione.jpg';
import ron from './images/ron.jpg';

class App extends Component {
  state = {
    characters: [{ name: "Harry", img: harry }, { name: "Hermione", img: hermione }, { name: "Ron", img: ron }, { name: "Harry", img: harry }, { name: "Hermione", img: hermione }, { name: "Ron", img: ron }, { name: "Harry", img: harry }, { name: "Hermione", img: hermione }, { name: "Ron", img: ron }, { name: "Harry", img: harry }, { name: "Hermione", img: hermione }, { name: "Ron", img: ron }, { name: "Harry", img: harry }, { name: "Hermione", img: hermione }, { name: "Ron", img: ron }, { name: "Harry", img: harry }, { name: "Hermione", img: hermione }, { name: "Ron", img: ron }, { name: "Harry", img: harry }, { name: "Hermione", img: hermione }, { name: "Ron", img: ron }, { name: "Harry", img: harry }, { name: "Hermione", img: hermione }, { name: "Ron", img: ron }]
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess Who?!?</h1>
          <div className="outer">
            <div className="wrapper">
              {this.state.characters.map((character, index) => {
                return (
                  <Character name={character.name} img={character.img} key={index} />
                )
              })}
            </div>
            <div className="sidebar">
              <Question />
            </div>
          </div>

        </header>
      </div>
    );

  }

}

export default App;

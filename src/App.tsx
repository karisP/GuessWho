import * as React from 'react';
import './App.css';
import Character from './components/Character/Character';
import Question from './components/Question/Question';
//import Chat from './components/Chat/Chat';
import harry from './images/harry_potter/harry.jpg';
import hermione from './images/harry_potter/hermione.jpg';
import ron from './images/harry_potter/ron.jpg';
import dobby from './images/harry_potter/dobby.jpg';
import draco from './images/harry_potter/draco.jpg';
import dudley from './images/harry_potter/dudley.jpg';
import dumbledore from './images/harry_potter/dumbledore.jpg';
import filch from './images/harry_potter/filch.jpg';
import hagrid from './images/harry_potter/hagrid.jpg';
import hedwig from './images/harry_potter/hedwig.jpg';
import luna from './images/harry_potter/luna.jpg';
import mcgonagall from './images/harry_potter/mcgonagall.jpg';
import neville from './images/harry_potter/neville.jpg';
import sirius from './images/harry_potter/sirius.jpg';
import snape from './images/harry_potter/snape.jpg';
import voldemort from './images/harry_potter/voldemort.jpg';
import nagini from './images/harry_potter/nagini.jpg';
import bellatrix from './images/harry_potter/bellatrix.jpg';
import umbridge from './images/harry_potter/umbridge.jpg';
import ginny from './images/harry_potter/ginny.jpg';
import lupin from './images/harry_potter/lupin.jpg';
import trelawney from './images/harry_potter/trelawney.jpg';
import myrtle from './images/harry_potter/myrtle.jpg';
import moody from './images/harry_potter/moody.jpg';

interface Character
{
    name: '';
    img: '';

}

const App = () => {
  //const [dbcharacters, setDbCharacters] = React.useState<string>('');
  React.useEffect(() => {
    getCharacters();
  }, []);
  function getCharacters() {
    fetch('http://localhost:3001')
    .then(response => {
      return response.text();
    })
    .then(data => {
        console.log(data);
        //setDbCharacters(data);
      });
  }

    const characters = [{ name: "Harry", img: harry },
      { name: "Hermione", img: hermione },
      { name: "Ron", img: ron },
      { name: "Dobby", img: dobby },
      { name: "Draco", img: draco },
      { name: "Dudley", img: dudley },
      { name: "Dumbledore", img: dumbledore },
      { name: "Filch", img: filch },
      { name: "Hagrid", img: hagrid }, 
      { name: "Hedwig", img: hedwig }, 
      { name: "Luna", img: luna }, 
      { name: "Mcgonagall", img: mcgonagall }, 
      { name: "Neville", img: neville }, 
      { name: "Sirius", img: sirius }, 
      { name: "Snape", img: snape }, 
      { name: "Voldemort", img: voldemort }, 
      { name: "Nagini", img: nagini }, 
      { name: "Bellatrix", img: bellatrix }, 
      { name: "Umbridge", img: umbridge }, 
      { name: "Ginny", img: ginny }, 
      { name: "Lupin", img: lupin }, 
      { name: "Trelawney", img: trelawney }, 
      { name: "Myrtle", img: myrtle }, 
      { name: "Moody", img: moody } ]

    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess Hoot</h1>
          <div className="outer">
            <div className="wrapper">
              {characters.map((character, index) => {
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
export default App;
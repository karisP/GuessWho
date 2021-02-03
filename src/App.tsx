import * as React from 'react';
import './App.css';
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
import { Route, Switch, useParams } from 'react-router-dom';
import Main from './Main';

interface IParams{
  id: string;
}
export interface ICharacter {
  id: number;
  name: string;
  hairType: string;
  hairColor: string;
  hairLength: string;
  facialHair: boolean;
  definingFeature: string;
  gender: string;
  accessory: string;
  age: string;
  species: string;
  role: string;
  house: string;
}

function api<T>(url: string): Promise<T> {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        const errorMessage = 'Error loading data from' + url;
        return Promise.reject(errorMessage);
      }
      return response.json().then(data => data as T);
    })
}

const App = () => {
  const params = useParams<IParams>();
  const [dbCharacter, setDbCharacter] = React.useState<ICharacter | null>(null);
  const [twoPlayers, setTwoPlayers] = React.useState<boolean>(false);
  const [dbCharacterTwo, setDbCharacterTwo] = React.useState<ICharacter | null>(null);
  console.log(dbCharacter, dbCharacterTwo);

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 24);
  }

  React.useEffect(() => {
    api<ICharacter[]>('http://localhost:3001').then(data => {
      //console.log(data);
      let randomInt: number = 0;
      if(params.id){
        randomInt = parseInt(params.id);
      }else{
        randomInt = generateRandomNumber();
      }
      setDbCharacter(data[randomInt]);
      if (twoPlayers) {
        let randomIntTwo = generateRandomNumber();
        if (randomIntTwo === randomInt) randomIntTwo = generateRandomNumber();
        setDbCharacterTwo(data[randomIntTwo]);
      }
    })
  }, [twoPlayers, params.id]);
  //console.log("dbCharacter", dbCharacter);
  //console.log("dbCharacterTwo", dbCharacterTwo);
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
  { name: "Moody", img: moody }]

  const onTogglePlayer = (arg: boolean) => {
    setTwoPlayers(arg);
    console.log("onTogglePlayer", !twoPlayers);
    //setTwoPlayers(!twoPlayers);
    console.log(dbCharacterTwo);
  }

  const winCharacter = dbCharacter ? characters.filter(x => x.name === dbCharacter.name)[0] : null;


  return (
      <div className="App">
        <Switch>
          <Route exact path="/:id" render={() =>
             <Main characters={characters} twoPlayers={twoPlayers} dbCharacter={dbCharacter} dbCharacterTwo={dbCharacterTwo} onTogglePlayer={onTogglePlayer} winCharacter={winCharacter}/>} />
          <Route path="/" render={() =>
             <Main characters={characters} twoPlayers={twoPlayers} dbCharacter={dbCharacter} dbCharacterTwo={dbCharacterTwo} onTogglePlayer={onTogglePlayer} winCharacter={winCharacter}/>} />
        </Switch>
      </div>
  );

}

export default App;

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
import { Route, Switch, useHistory } from 'react-router-dom';
import Main from './Main';

export interface ICharacter {
  id: number;
  name: string;
  hairType: string;
  hairColor: string;
  hairLength: string;
  facialHair: string;
  definingFeature: string;
  gender: string;
  accessory: string;
  age: string;
  species: string;
  role: string;
  house: string;
}

//strongly type the data that is retrieved
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
  const history = useHistory();
  const [paramsId, setParamsId] = React.useState<string | undefined>(undefined);
  const [dbCharacter, setDbCharacter] = React.useState<ICharacter | null>(null);
  const [twoPlayers, setTwoPlayers] = React.useState<boolean>(false);
  const [dbCharacterTwoId, setDbCharacterTwoId] = React.useState<number | null>(null);

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 24);
  }

  React.useEffect(() => {
    api<ICharacter[]>('http://localhost:3001').then(data => {
      let randomInt: number = 0;
      //set up data for two player version
      if (paramsId !== undefined) {
        randomInt = parseInt(paramsId);
        setTwoPlayers(true);
      } else {
        //generate random int for solo version
        randomInt = generateRandomNumber();
      }
      setDbCharacter(data[randomInt]);
      //generate link for player one to send to player two
      if (twoPlayers) {
        let randomIntTwo = generateRandomNumber();
        if (randomIntTwo === randomInt) randomIntTwo = generateRandomNumber();
        setDbCharacterTwoId(randomIntTwo);
      }
    });
  }, [twoPlayers, paramsId]);

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
    //remove two player param from url when toggle to solo version
    if (arg === false) {
      setParamsId(undefined);
      setDbCharacterTwoId(null);
      history.replace("/");
    }
  }

  const shuffleCharacters = (array: {name: string, img: string}[]) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  shuffleCharacters(characters);
  
  //get the local image for the character win modal
  const winCharacter = dbCharacter ? characters.filter(x => x.name === dbCharacter.name)[0] : null;


  return (
    <div className="App">
      <Switch>
        <Route exact path="/:id" render={() =>
          <Main characters={characters} setParamsId={setParamsId} twoPlayers={twoPlayers} dbCharacter={dbCharacter} dbCharacterTwoId={dbCharacterTwoId} onTogglePlayer={onTogglePlayer} winCharacter={winCharacter} />} />
        <Route path="/" render={() =>
          <Main characters={characters} setParamsId={setParamsId} twoPlayers={twoPlayers} dbCharacter={dbCharacter} dbCharacterTwoId={dbCharacterTwoId} onTogglePlayer={onTogglePlayer} winCharacter={winCharacter} />} />
      </Switch>
    </div>
  );

}

export default App;

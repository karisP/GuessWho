import * as React from 'react';
import './App.css';
import Character from './components/Character/Character';
import Chatbot from './components/Chatbot/Chatbot';
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
import Modal from './components/Modal/Modal';
import StartModal from './components/Modal/StartModal';

export interface ICharacter{
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
    if(!response.ok){
      const errorMessage = 'Error loading data from' + url;
      return Promise.reject(errorMessage);
    }
    return response.json().then(data => data as T);
  })
}

const App = () => {
  const [dbCharacter, setDbCharacter] = React.useState<ICharacter | null>(null);
  const [win, setWin] = React.useState<boolean | null>(null);
  const [questionCount, setQuestionCount] = React.useState<number>(0);
  const [closeStartModal, setCloseStartModal] = React.useState<boolean>(false);
  const [minimizeChatbot, setMinimizeChatbot] = React.useState<boolean>(true);
  const [resetCards, setResetCards] = React.useState<boolean>(false);
  React.useEffect(() => {
    api<ICharacter[]>('http://localhost:3001').then(data => {
      //console.log(data);
      let randomInt = Math.floor(Math.random() * 24); 
      setDbCharacter(data[randomInt]);
    })
  }, []);
  console.log(dbCharacter);

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

    const onWin = (win:boolean) => {
      setWin(win);
    }

    const onStartNewGame = () => {
      window.location.reload();
    }

    const onCountQuestions = () => {
      setQuestionCount(questionCount + 1);
    }

    const onCloseStartModal = () => {
      setCloseStartModal(true);
    }
    
    const onHandleResetCards = () => {
      //do a functional setState here
      setResetCards(!resetCards);
    }
    const winCharacter = dbCharacter ? characters.filter(x => x.name === dbCharacter.name)[0] : null;

    return (
      <div className="App">
        {/* <audio src={require('./media/themesong.mp3')} loop autoPlay/> */}
        {!closeStartModal ? <StartModal onCloseStartModal={onCloseStartModal}/> : null }
        {win ? <Modal onStartNewGame={onStartNewGame} submittedQuestionCount={questionCount} winCharacter={winCharacter} dbCharacter={dbCharacter}/> : null}
        <header className="App-header">
          <h1>Guess Hoot</h1>
          <div className="outer">
            <button className="reset-btn" onClick={() => onHandleResetCards()}>Reset</button>
            <div className={minimizeChatbot ? "full-width" : "wrapper"}>
              {characters.map((character, index) => {
                return (
                  <Character name={character.name} img={character.img} key={index} resetCards={resetCards} onHandleResetCards={onHandleResetCards}/>
                )
              })}
            </div>
            <div className={minimizeChatbot ? "hidden" : "sidebar"}>
              <Chatbot character={dbCharacter} onWin={onWin} win={win} onCountQuestions={onCountQuestions} minimize={minimizeChatbot} setMinimize={setMinimizeChatbot}/>
            </div>
            <button className={!minimizeChatbot ? "hidden" : "hat-btn"} onClick={() => setMinimizeChatbot(false)}>?</button>
          </div>

        </header>
      </div>
    );

}

export default App;

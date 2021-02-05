import * as React from 'react';
import './App.css';
import Character from './components/Character/Character';
import Chatbot from './components/Chatbot/Chatbot';
import Modal from './components/Modal/Modal';
import StartModal from './components/Modal/StartModal';
import Toggle from './components/Toggle/Toggle';
import { ICharacter } from './App';


interface IProps {
  characters: { img: string; name: string }[];
  dbCharacter: ICharacter | null;
  dbCharacterTwoId: number | null;
  onTogglePlayer: (arg: boolean) => void;
  twoPlayers: boolean;
  winCharacter: { img: string; name: string } | null;
}


const Main = (props: IProps) => {
  const [win, setWin] = React.useState<boolean | null>(null);
  const [revealAnswer, setRevealAnswer] = React.useState<boolean>(false);
  const [questionCount, setQuestionCount] = React.useState<number>(0);
  const [closeStartModal, setCloseStartModal] = React.useState<boolean>(false);
  const [minimizeChatbot, setMinimizeChatbot] = React.useState<boolean>(true);
  const [resetCards, setResetCards] = React.useState<boolean>(false);

  const onWin = (win: boolean) => {
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
    setResetCards(prevState => !prevState);
  }

  return (

    <div className="App">
      {/* <audio src={require('./media/themesong.mp3')} loop autoPlay/> */}
      {!closeStartModal ? <StartModal onCloseStartModal={onCloseStartModal} /> : null}
      {(win || revealAnswer) ? <Modal win={win} onClose={onStartNewGame} revealAnswer={revealAnswer} submittedQuestionCount={questionCount} winCharacter={props.winCharacter} dbCharacter={props.dbCharacter} /> : null}
      <header className="App-header">
        <h1>Guess Hoot</h1>
        {/* <button onClick={onTogglePlayer}>Toggle Player</button> */}
        <Toggle onToggle={props.onTogglePlayer} onOpenModal={setMinimizeChatbot}/>
        <div className="outer">
          <button className="reset-btn" onClick={() => onHandleResetCards()} />
          <div className={(minimizeChatbot || props.twoPlayers) ? "full-width" : "wrapper"}>
            {props.characters.map((character, index) => {
              return (
                <Character name={character.name} img={character.img} key={index} resetCards={resetCards} onHandleResetCards={onHandleResetCards} />
              )
            })}
          </div>
          <div className={minimizeChatbot ? "hidden" : "sidebar"}>
            {!props.twoPlayers ?
              <Chatbot
                character={props.dbCharacter}
                onHandleResetCards={onHandleResetCards}
                onWin={onWin}
                onRevealAnswer={setRevealAnswer}
                win={win}
                onCountQuestions={onCountQuestions}
                minimize={minimizeChatbot}
                setMinimize={setMinimizeChatbot} />
              :
              <Modal winCharacter={props.winCharacter} twoPlayers dbCharacterTwoId={props.dbCharacterTwoId} onClose={() => setMinimizeChatbot(!minimizeChatbot)} />
            }
          </div>
          <button className={!minimizeChatbot ? "hidden" : "hat-btn"} onClick={() => setMinimizeChatbot(false)}>?</button>
        </div>

      </header>
    </div>
  );

}

export default Main;

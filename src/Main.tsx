import * as React from 'react';
import './App.css';
import Character from './components/Character/Character';
import Chatbot from './components/Chatbot/Chatbot';
import Modal from './components/Modal/Modal';
import StartModal from './components/Modal/StartModal';
import Toggle from './components/Toggle/Toggle';
import { ICharacter } from './App';
import { useParams } from 'react-router-dom';

interface IParams{
  id: string;
}

interface IProps {
  characters: { img: string; name: string }[];
  dbCharacter: ICharacter | null;
  dbCharacterTwoId: number | null;
  onTogglePlayer: (arg: boolean) => void;
  twoPlayers: boolean;
  winCharacter: { img: string; name: string } | null;
  setParamsId: (arg: string) => void;
}


const Main = (props: IProps) => {
  const params = useParams<IParams>();
  const [win, setWin] = React.useState<boolean | null>(null);
  const [revealAnswer, setRevealAnswer] = React.useState<boolean>(false);
  const [questionCount, setQuestionCount] = React.useState<number>(0);
  const [closeStartModal, setCloseStartModal] = React.useState<boolean>(params.id ? true : false);
  const [minimizeChatbot, setMinimizeChatbot] = React.useState<boolean>(params.id? false : true);
  const [resetCards, setResetCards] = React.useState<boolean>(false);

  React.useEffect(() => {
    if(params.id) {
      props.setParamsId(params.id);
    }
  })

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
    setResetCards(true);
  }

  return (

    <div className="App">
      {/* <audio src={require('./media/themesong.mp3')} loop autoPlay/> */}
      {!closeStartModal ? <StartModal onCloseStartModal={onCloseStartModal} /> : null}
      {(win || revealAnswer) ? <Modal win={win} onClose={onStartNewGame} revealAnswer={revealAnswer} submittedQuestionCount={questionCount} winCharacter={props.winCharacter} dbCharacter={props.dbCharacter} /> : null}
      <header className="App-header">
        <h1>Guess Hoot</h1>
        <Toggle onToggle={props.onTogglePlayer} onOpenModal={setMinimizeChatbot} />
        <div className="outer">
        <div className="tooltip">
          <button className="reset-btn" onClick={() => onHandleResetCards()} />
          <span className="tooltiptext" id="myTooltip">Reset cards</span>
        </div>
          <div className={(minimizeChatbot || props.twoPlayers) ? "full-width" : "wrapper"}>
            {props.characters.map((character, index) => {
              return (
                <Character name={character.name} img={character.img} key={index} resetCards={resetCards} setResetCards={setResetCards} />
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

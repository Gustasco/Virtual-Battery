import React, { useState, useEffect } from "react";
import drumPadData from "./drumPadData";
import "./App.css";

const DrumButton = ({ id, keyTrigger, src, handleClick }) => {
  return (
    <div className="drum-pad" id={id} onClick={() => handleClick(id)}>
      {keyTrigger}
      <audio className="clip" id={`audio-${id}`} src={src} />
    </div>
  );
};

const App = () => {
  const [displayText, setDisplayText] = useState("");

  const handleKeyPress = (event) => {
    const drumPad = drumPadData.find(
      (pad) => pad.keyTrigger === event.key.toUpperCase()
    );
    if (drumPad) {
      playAudio(drumPad);
      setDisplayText(drumPad.id);
    }
  };

  const handleClick = (id) => {
    const drumPad = drumPadData.find((pad) => pad.id === id);
    if (drumPad) {
      playAudio(drumPad);
      setDisplayText(drumPad.id);
    }
  };

  const playAudio = (drumPad) => {
    const audioElement = document.getElementById(`audio-${drumPad.id}`);
    audioElement.currentTime = 0;
    audioElement.play();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const renderDrumButtons = () => {
    const drumButtonGroups = [];
    for (let i = 0; i < drumPadData.length; i += 3) {
      drumButtonGroups.push(
        <div className="drum-button-group" key={i}>
          {drumPadData.slice(i, i + 3).map((drumPad) => (
            <DrumButton
              key={drumPad.id}
              id={drumPad.id}
              keyTrigger={drumPad.keyTrigger}
              src={drumPad.src}
              handleClick={handleClick}
            />
          ))}
        </div>
      );
    }
    return drumButtonGroups;
  };

  return (
    <div id="drum-machine">
      <div>
        <div id="display">{displayText}</div>
      </div>
      {renderDrumButtons()}
      <footer className="footer">
        Hecho por Gustavo Espinoza |{" "}
        <a
          href="https://www.linkedin.com/in/gustavo-espinoza-a4882625a/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mi LinkedIn
        </a>{" "}
        | Buscando trabajo
      </footer>
    </div>
  );
};

export default App;

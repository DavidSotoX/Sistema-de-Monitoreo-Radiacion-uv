import React, { useState } from "react";
import "./assets/Bot.css";
import ChatBot from "./ChatBot";
import bot from "./assets/UNL_BOT.jpg";
const Bot = (props) => {
  const { usuario, isUser } = props;
  const [show, setShow] = useState(false);

  const handleButtonClick = () => {
    setShow(!show);
  };

  return (
    <>
      {show ? (
        <ChatBot
          setShow={setShow}
          isUser={isUser}
          usuario={
            usuario
              ? usuario.nombres.split(" ")[0] +
                " " +
                usuario.apellidos.split(" ")[0]
              : "Un simple usuario"
          }
        />
      ) : (
        <div className={`bot-container ${show ? "active" : ""}`}>
          <div
            className="bot-button"
            onClick={handleButtonClick}
            style={{
              scale: "2",
              transform: "translate(-50%, -50%)",
            }}
          >
            <img
              style={{
                scale: "0.9",
              }}
              src={bot}
              alt="Bot Icon"
              className="bot-icon"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Bot;

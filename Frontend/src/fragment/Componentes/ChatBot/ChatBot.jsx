import React, { useState } from "react";
import { POST } from "../../../hooks/Conexion";
import {
  borrarMensajes,
  getMensajes,
  getToken,
  hayMensajes,
  saveMensajes,
} from "../../../utilidades/Sessionutil";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import bot from "./assets/UNL_BOT.jpg";
import user from "./assets/UNL3.png";
import userLog from "./assets/USER.png";
import {
  Avatar,
  ChatContainer,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { Button } from "react-bootstrap";

import sweetAlert from "sweetalert";
const ChatBot = (props) => {
  const { usuario, setShow, isUser } = props;
  const [conversacion, setConversacion] = useState(
    hayMensajes()
      ? getMensajes()
      : [
          {
            sender: "AdrianBot",
            message: "¡Hola! ¿En qué puedo ayudarte?",
            isBot: true,
          },
        ]
  );

  const [isLoading, setIsLoading] = useState(false);

  const enviarMensaje = async (mensaje) => {
    const nuevoMensaje = {
      sender: "user",
      message: mensaje,
      direction: "outgoing",
    };
    const nuevosMensajes = [...conversacion, nuevoMensaje];
    setConversacion(nuevosMensajes);
    setIsLoading(true);
    const data = {
      prompt: mensaje,
      username: usuario,
    };
    POST(data, "enviarmensaje", getToken())
      .then((info) => {
        if (info.code !== 200) {
          setIsLoading(false);
        } else {
          setConversacion((prev) => [
            ...prev,
            {
              sender: "AdrianBot",
              message: info.info,
              isBot: true,
              direction: "incoming",
            },
          ]);
        }
      })
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">AdrianBot</h3>
        <Button
          variant="danger"
          style={{
            position: "absolute",
            top: "5px",
            right: "10px",
            color: "white",
            fontSize: "15px",
          }}
          onClick={() => {
            setShow(false);
            saveMensajes(conversacion);
          }}
        >
          <span aria-hidden="true">&times;</span>
        </Button>
        <Button
          variant="dark"
          style={{
            position: "absolute",
            top: "5px",
            right: "40px",
            color: "white",
            fontSize: "15px",
          }}
          onClick={() =>
            new sweetAlert({
              title: "¿Estás seguro de borrar el chat?",
              text: "No podrás recuperar los mensajes",
              icon: "warning",
              buttons: {
                cancel: "Cancelar",
                confirm: "Aceptar",
              },
            }).then((result) => {
              if (result) {
                borrarMensajes();
                setShow(false);
              }
            })
          }
        >
          <span aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
            </svg>
          </span>
        </Button>
      </div>
      <div className="card-body">
        <div style={{ height: "500px", width: "100%" }}>
          <MainContainer>
            <ChatContainer>
              <MessageList
                scrollBehavior="smooth"
                typingIndicator={
                  isLoading ? (
                    <TypingIndicator content="AdrianBot está escribiendo..." />
                  ) : null
                }
              >
                {conversacion.map((mensaje, index) => {
                  return (
                    <Message
                      model={mensaje}
                      key={index}
                      children={
                        <Avatar
                          src={mensaje.isBot ? bot : isUser ? userLog : user}
                        />
                      }
                    />
                  );
                })}
              </MessageList>
              <MessageInput
                placeholder="Escribir al chatbot"
                onSend={enviarMensaje}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;

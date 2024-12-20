import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import ContenedorInicio from "../../Componentes/ContenedorInicio";
import Bot from "../../Componentes/ChatBot/Bot";

const PaginaInicio = () => {
  return (
    <div>
      <section
        className="home"
        style={{
          backgroundPosition: "center",
          boxShadow: "inset 0 100px 50px 4px rgb(0 0 0 / 40%)",
        }}
      >
        <Header />

        <div
          className="container text-center"
          style={{
            transform: "translateY(150px)",
            alignItems: "center",
            backgroundColor: "rgba(19, 35, 64, 0.6)",
            borderRadius: "20px",
          }}
        >
          <ContenedorInicio />
        </div>
        <div
          className="contenedor-borde-izquierdo-abajo"
          style={{
            position: "fixed",
            bottom: "50px",
            right: "40px",
            width: "450px", // Ajusta el ancho según tus necesidades
            height: "600px", // Ajusta la altura según tus necesidades
            borderRadius: "10px", // Ajusta el radio de borde según tus necesidades
            zIndex: "2", // Asegura que esté por encima del contenedor principal
          }}
        >
          {!true && <Bot usuario={null} />}
        </div>
      </section>
    </div>
  );
};

export default PaginaInicio;

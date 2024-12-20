import { borrarSesion } from "../../../utilidades/Sessionutil";
function PageNotFound() {
  return (
    <section
      className="home"
      style={{
        backgroundPosition: "center",
        boxShadow: "inset 0 100px 50px 4px rgb(0 0 0 / 40%)",
      }}
    >
      <div
        className="container text-center"
        style={{
          transform: "translateY(300px)",
          alignItems: "center",
          backgroundColor: "rgba(19, 35, 64, 0.6)",
          borderRadius: "20px",
          width: "1000px",
        }}
      >
        <div className="row justify-content-center">
          <div className="col-9">
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/d/df/UNL3.png"
              }
              alt="404"
              style={{ width: "40%" }}
            />

            <div className="row justify-content-center">
              <div className="col">
                <h1
                  style={{
                    color: "white",
                    fontSize: "48px",
                    fontFamily: "Arial",
                    fontWeight: "600",
                    borderBottom: "3px solid #e20613",
                  }}
                >
                  ERROR 404
                </h1>
                <h2
                  style={{
                    color: "gray",
                    fontSize: "30px",
                    fontFamily: "Arial",
                    fontWeight: "600",
                  }}
                >
                  La página que buscas no existe
                </h2>
                <a
                  style={{
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                  className="btn btn-danger"
                  href="/"
                  onClick={() => borrarSesion()}
                >
                  Volver
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageNotFound;

import "./App.css";

import { Route, Routes } from "react-router-dom";
import PageNotFound from "./fragment/Main/Public/PageNotFound";
import PaginaInicio from "./fragment/Main/Public/PageInicio";
import { MiddlewareSesion, MiddlewareNoSesion } from "./utilidades/Middleware";
import PageInicioAdmin from "./fragment/Main/PageAdmin/PageInicioAdmin";
import PaginaInicioUser from "./fragment/Main/PageUser/PageInicioUser";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MiddlewareNoSesion>
            <PaginaInicio />
          </MiddlewareNoSesion>
        }
      />
      <Route
        path="/admin"
        element={
          <MiddlewareSesion>
            <PageInicioAdmin />
          </MiddlewareSesion>
        }
      />
      <Route
        path="/admin/gestion"
        element={
          <MiddlewareSesion>
            <PageInicioAdmin />
          </MiddlewareSesion>
        }
      />
      <Route
        path="/admin/gestion/usuarios"
        element={
          <MiddlewareSesion>
            <PageInicioAdmin />
          </MiddlewareSesion>
        }
      />
      <Route
        path="/admin/gestion/dispositivos"
        element={
          <MiddlewareSesion>
            <PageInicioAdmin />
          </MiddlewareSesion>
        }
      />
      <Route
        path="/admin/gestion/dispositivos/mediciones"
        element={
          <MiddlewareSesion>
            <PageInicioAdmin />
          </MiddlewareSesion>
        }
      />
      <Route
        path="/admin/gestion/solicitudes"
        element={
          <MiddlewareSesion>
            <PageInicioAdmin />
          </MiddlewareSesion>
        }
      />
      <Route
        path="/admin/configuracion"
        element={
          <MiddlewareSesion>
            <PageInicioAdmin />
          </MiddlewareSesion>
        }
      />
      <Route
        path="/admin/configuracion/editar_perfil"
        element={
          <MiddlewareSesion>
            <PageInicioAdmin />
          </MiddlewareSesion>
        }
      />
      <Route
        path="/inicio"
        element={
          <MiddlewareSesion>
            <PaginaInicioUser />
          </MiddlewareSesion>
        }
      />
      <Route
        path="/inicio/configuracion"
        element={
          <MiddlewareSesion>
            <PaginaInicioUser />
          </MiddlewareSesion>
        }
      />
      
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;

import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Markers from "./VenueMarkers";

const MapView = (props) => {
  const { setSelectedUVData, dispositivos } = props;
  const [forceUpdate, setForceUpdate] = useState(false);
  const [state, setState] = useState({
    currentLocation: { lat: "-4.030666556110944", lng: "-79.19964490854842" },
    zoom: 15,
    dispositivos: dispositivos,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setState((prevState) => ({
          ...prevState,
          currentLocation,
          dispositivos: prevState.dispositivos.concat({
            identificador: "Tu ubicación",
            latitud: currentLocation.lat,
            longitud: currentLocation.lng,
            medicion: [
              {
                uv: 0,
              },
            ],
          }),
        }));
        setForceUpdate((prev) => !prev);
      },
      function (error) {},
      {
        enableHighAccuracy: true,
      }
    );
  }, [setForceUpdate]);

  return (
    <div
      className="card text-center"
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        backgroundColor: "rgba(19, 35, 64, 0.7)",
      }}
    >
      <>
        <div className="card-header">
          <h3
            className="card-title"
            style={{ fontWeight: "bold", color: "white" }}
          >
            Ubicación Geográfica
          </h3>
        </div>
        <div className="card-body" style={{ width: "102%", height: "10%" }}>
          <div className="row" style={{ maxWidth: "100%", maxHeight: "100%" }}>
            <MapContainer
              key={forceUpdate ? "force-update" : "normal-update"}
              center={state.currentLocation}
              zoom={state.zoom}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://github.com/Ssamaeljs">SamaelJS</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Markers
                dispositivos={state.dispositivos}
                setSelectedUVData={setSelectedUVData}
              />
            </MapContainer>
          </div>
        </div>
      </>
    </div>
  );
};

export default MapView;

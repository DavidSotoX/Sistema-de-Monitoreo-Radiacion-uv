import React from "react";
import { Marker } from "react-leaflet";
import { VenueLocationIcon } from "./VenueLocationIcon";
import MarkerPopup from "./MarkerPopup";
import VenueLocationIconDisable from "./VenueLocationIconDisable";

const VenueMarkers = (props) => {
  const { dispositivos, setSelectedUVData } = props;
  const venues = dispositivos.map((dispositivo) => {
    let uv = 0;
    let fecha;
    dispositivo.medicion.map((medicion) => {
      fecha = medicion.fecha;
      uv = medicion.uv;
    });
    uv = uv.toFixed(2);
    if (uv >= 100 || uv == 0) {
      uv = Math.floor(uv);
    }
    return {
      geometry: [dispositivo.latitud, dispositivo.longitud],
      name: dispositivo.nombre,
      uv: uv,
      fecha: fecha,
      estado: dispositivo.activo,
    };
  });

  const markers = venues.map((venue, i) => (
    <Marker
      key={i}
      position={venue.geometry}
      icon={venue.estado ? VenueLocationIcon : VenueLocationIconDisable}
    >
      <MarkerPopup data={venue} setSelectedUVData={setSelectedUVData} />
    </Marker>
  ));
  return <>{markers}</>;
};

export default VenueMarkers;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

function ConocenosView() {
  const [coordenadas, setCoordenadas] = useState([-12.05543, -77.03858]);

  const AnadirMarcador = () => {
    const map = useMapEvents({
      click: (e) => {
        // console.log("viendo useMapEvents", e);
        const { lat, lng } = e.latlng;
        setCoordenadas([lat, lng]);
      },
    });
    return null;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="container">
      <div className="row pt-5 pb-3">
        <div className="col-12-col-md-12 col-lg-6">
          <h2 className="text-info">Conocemos aqui:</h2>
          <p className="lead">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas
            ipsam rem earum, facere modi praesentium ducimus, nisi quam possimus
            in placeat? Blanditiis magnam quos vero! Architecto et doloremque
            numquam minima? Facilis voluptatum neque, accusamus accusantium sed
          </p>
        </div>

        <div className="col-12-col-md-12 col-lg-6">
          <h2>Dejanos tu mensaje , te responderemos en breve</h2>
          <form>
            <div className="mb-2">
              <label className="form-label">Correo</label>
              <input
                type="email"
                className="form-control"
                placeholder="Ej pepito@gmail.com"
                {...register("correo", { required: true })}
              />
              {errors.correo && (
                <small className="text-danger">Este campo es obligatorio</small>
              )}
            </div>
            <div className="mb-2">
              <label className="form-label">Mensaje</label>
              <textarea
                className="form-control"
                cols="30"
                rows="10"
                placeholder="Ej Hola me gustaria saber si tienen....."
                {...register("mensaje", { required: true })}
              ></textarea>
              {errors.mensaje && (
                <small className="text-danger">Este campo es obligatorio</small>
              )}
            </div>
            <div className="mb-2">
              <button className="btn btn-primary">Enviar</button>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-12 pb-4">
          <MapContainer
            center={coordenadas}
            zoom={15}
            style={{ height: "400px" }}
          >
            {/* Tile Layer es la fuente de datos para leaflet */}
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <AnadirMarcador />
            <Marker position={coordenadas} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default ConocenosView;

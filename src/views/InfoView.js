import React from "react";
import WaveImg from "../assets/wave.svg";
import ImgGamer from "../assets/gamer.svg";
import { motion } from "framer-motion/dist/es/index";
export default function InfoView() {
  return (
    <div style={{ position: "relative", background: "#f8fbfe" }}>
      {/*  IMAGEN WAVE */}
      <img
        src={WaveImg}
        alt=""
        style={{ position: "absolute", width: "100%" }}
      />

      {/*   CONTENIDO */}
      <div className="container vh-100 pt-4" style={{ zIndex: 100 }}>
        <div
          className="row d-flex align-items-center"
          style={{ height: "100%" }}
        >
          <motion.div
            className="col-12 col-md-12 col-lg-6 d-flex flex-column justify-content-center pb-4"
            style={{ zIndex: 100 }}
            initial={{ x: "-50vw" }}
            animate={{
              x: "0",
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
          >
            <h2
              className="fw-bold text-uppercase"
              style={{ fontSize: "36px", color: "#51c9ff" }}
            >
              Tenemos todo lo que buscas
            </h2>
            <p style={{ color: "#51c9ff" }} className="my-4 fw-bold">
              Contamos con tiendas en mas de{" "}
              <span style={{ color: "#F87F81" }}>28 paises</span>
            </p>
            <p style={{ color: "#84879E" }} className="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At
              dolorum, deleniti accusamus nobis eum suscipit pariatur animi
              soluta voluptate laborum totam quidem consequatur vitae sapiente
              eos aliquid laudantium officiis. Quas ea ipsam est, sit magni
              molestiae consectetur quo ducimus inventore.
            </p>
            <div>
              <button
                className="mt-4 "
                style={{
                  border: "none",
                  background: "#010D82",
                  padding: "15px 40px",
                  color: "white",
                  borderRadius: "8px",
                }}
              >
                Conocenos
              </button>
            </div>
          </motion.div>
          {/*      IMAGEN */}
          <motion.div
            className="col-12 col-md-12 col-lg-6 fw-bolder"
            style={{ zIndex: 100 }}
            initial={{ y: "50vw" }}
            animate={{
              y: "0",
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
          >
            <img src={ImgGamer} alt="" className="w-75" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

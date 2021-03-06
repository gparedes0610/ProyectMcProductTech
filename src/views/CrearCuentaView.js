import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion/dist/es/index";
function CrearCuentaView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const recibirSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <p className="h2 text-uppercase text-center fw-bold my-3">CREAR CUENTA</p>
      <div className="container-fluid" style={{ marginBottom: "180px" }}>
        <div className="row">
          <motion.div
            className="col-12 col-md-6 col-lg-6"
            style={{ margin: "0 auto" }}
            initial={{ x: "-50vw" }}
            animate={{
              x: "0",
              transition: { duration: 1, ease: "easeInOut" },
            }}
          >
            <Form className="pt-3 " onSubmit={handleSubmit(recibirSubmit)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese un nombre"
                  {...register("nombre", { required: true })}
                />
                {errors.nombre && (
                  <small className="text-danger">
                    Este Campo es obligatorio
                  </small>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese Nombre"
                  {...register("apellido", { required: true })}
                />
                {errors.apellido && (
                  <small className="text-danger">
                    Este Campo es obligatorio
                  </small>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo Electronico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese Correo electronico"
                  {...register("correo", { required: true })}
                />
                {errors.correo && (
                  <small className="text-danger">
                    Este Campo es obligatorio
                  </small>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contrase??a</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese una contrase??a"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <small className="text-danger">
                    Contrase??a incorrecta o campo vacio
                  </small>
                )}
              </Form.Group>
              <div className="d-flex justify-content-between align-items-center">
                <Button variant="success" type="submit">
                  Registrarse
                </Button>
                <Link className="text-secondary" to="/login">
                  Cancelar
                </Link>
              </div>
            </Form>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default CrearCuentaView;

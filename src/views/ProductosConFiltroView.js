import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { obtenerCategorias } from "../service/categoriaService";
import { ListGroup, Button, Spinner } from "react-bootstrap";
import { motion } from "framer-motion/dist/es/index";
import { useParams } from "react-router";
import Slider from "@mui/material/Slider";
import {
  obtenerProductosPorPagina,
  obtenerProductos,
  obtenerProductosPorBusqueda,
} from "../service/productoService";
function ProductosConFiltroView() {
  const [categorias, setCategorias] = useState([]);

  const [todosLosProductos, setTodosLosProductos] = useState([]);
  const [productos, setProductos] = useState([]); // este productos hace el recorrido

  const [limite, setLimite] = useState(8);
  const [pagina, setPagina] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);
  ///////
  //console.log("hola entraste a productos con filtros");
  const { busqueda } = useParams();
  //console.log("busqueda", busqueda);
  const [productosBuscados, setProductosBuscados] = useState([]);
  //console.log("productos buscados", productosBuscados);

  const [precio, setPrecio] = useState([0, 500]);

  const getData = async () => {
    try {
      const totalProductos = await obtenerProductos();
      const prodObtenidosPorPagina = await obtenerProductosPorPagina(
        pagina,
        limite
      );
      const catObtenidas = await obtenerCategorias();

      const productoPorBusqueda = await obtenerProductosPorBusqueda(busqueda);

      setProductosBuscados(productoPorBusqueda);
      setCategorias(catObtenidas);
      setProductos(prodObtenidosPorPagina);
      setTodosLosProductos(totalProductos);

      const totalProduct = totalProductos.length;
      const prodDelLimite = 8;
      //console.log("todos los productos", totalProduct);
      // console.log("limite de productos", prodDelLimite);
      const totalPaginasCaculadas = Math.ceil(totalProduct / prodDelLimite);
      //console.log("total paginas calculadas", totalPaginasCaculadas);
      guardarTotalPaginas(totalPaginasCaculadas);

      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.log(error);
    }
  };

  //filtrar por categoria
  const filtarPorCategoria = (idCategoria) => {
    /* console.log("entra a filtarPorCategoria");
    console.log("id de categoria es", idCategoria);
    console.log("aqui todos los productos", todosLosProductos); */
    const productosFiltrados = todosLosProductos.filter(
      (producto) => producto.categoria_id === idCategoria
    );
    console.log("estos son los productos filtrados", productosFiltrados);
    setProductos(productosFiltrados);
    //setTodosLosProductos(productosFiltrados);
  };
  const [botonActivo, setBotonActivo] = useState(true);

  const cambiarEstado = () => {
    setBotonActivo(false);

    setTimeout(() => {
      setPagina(pagina + 1);
      setBotonActivo(true);
    }, 3000);
  };
  const cambiarEstadoAtras = () => {
    setBotonActivo(false);

    setTimeout(() => {
      setPagina(pagina - 1);
      setBotonActivo(true);
    }, 3000);
  };

  const manejarFiltroPrecio = (evento, nuevoRango) => {
    setPrecio(nuevoRango);
    // filtro el arreglo por los que tengan precio
    //mayor o igual que el menor valor del rango del SLider
    //meno o igual que el mayor valor del rango del SLider
    const productosPorPrecio = todosLosProductos.filter((prod) => {
      return prod.precio >= precio[0] && prod.precio <= precio[1];
    });
    setProductos(productosPorPrecio);
  };

  useEffect(() => {
    getData();
  }, [pagina]);
  return (
    <div className="container-fluid " style={{ background: "#e8e8e8" }}>
      {/* jumbotron */}

      <div className="container jumbotron ">
        <div className="row pt-5">
          <motion.div
            className="col-12 col-md-4 col-lg-4"
            initial={{ x: "-50vw" }}
            animate={{
              x: "0",
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
          >
            <motion.h3
              initial={{ y: "200vw" }}
              animate={{
                y: "0",
                transition: { duration: 0.8, ease: "easeInOut" },
              }}
            >
              Categorias
            </motion.h3>
            <ListGroup as="ul">
              <Button
                variant="info my-1 text-uppercase fw-bolder"
                className="py-2"
                as="li"
                onClick={() => setProductos(todosLosProductos)}
              >
                TODAS LAS CATEGORIAS
              </Button>
              {categorias.map((cat, i) => (
                <Button
                  variant="info my-1 text-uppercase fw-bolder"
                  className="py-2"
                  as="li"
                  key={i}
                  onClick={() => {
                    filtarPorCategoria(cat.id);
                  }}
                >
                  {cat.nombre}
                </Button>
              ))}
            </ListGroup>
            <Slider
              value={precio}
              onChange={manejarFiltroPrecio}
              valueLabelDisplay="auto"
              min={1}
              max={500}
            />
            <ul className="list-group">
              <li className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="bg-success text-light rounded-pill px-3 ">
                    S/.0
                  </p>
                </div>
                <div className="bg-success text-light rounded-pill px-3 ">
                  <p>S/.500</p>
                </div>
              </li>
            </ul>
          </motion.div>
          <div className="col-12 col-md-8 col-lg-8">
            <h3 className="text-center">Productos</h3>

            {productos.map((producto, i) => (
              <ProductCard producto={producto} key={i} />
            ))}
            <div className="col-12 d-flex justify-content-end mb-3">
              {pagina === 1 ? null : (
                <button
                  className="btn btn-primary mx-2"
                  disabled={!botonActivo}
                  onClick={() => {
                    cambiarEstadoAtras();
                  }}
                >
                  Atras
                </button>
              )}
              {pagina === totalpaginas ? null : (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    cambiarEstado();
                  }}
                  disabled={!botonActivo}
                >
                  Siguiente
                </button>
              )}
              {/* 
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductosConFiltroView;

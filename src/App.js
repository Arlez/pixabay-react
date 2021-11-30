import React, {useState, useEffect} from "react";
import Formulario from "./components/Formulario";
import ListaImagenes from "./components/ListaImagenes";

function App() {

  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);

  useEffect( () => {
    const consultaApi = async ()=>{
      if(busqueda === '') {
        return;
      }
      const imagenesPorPagina = 30;
      const key = '24581810-9d38eca28e9b5dcc58bc7ea48';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;
  
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      const paginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas(paginas);
      guardarImagenes(resultado.hits);

      const jumbotrom = document.querySelector('.jumbotron');
      jumbotrom.scrollIntoView({behavior: 'smooth'});
    }

    consultaApi();
  }, [busqueda, paginaActual]);

  const paginaAnterior = ()=> {
    const nuevaPaginaActual = paginaActual - 1;
    if(paginaActual === 1)return;
    guardarPaginaActual(nuevaPaginaActual);
  }

  const paginaSiguiente = ()=>{
    const nuevaPaginaActual = paginaActual + 1;
    if(nuevaPaginaActual > totalPaginas)return;
    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario
          guardarBusqueda={guardarBusqueda}
        />
      </div>

      <div className="row justify-content-center">

        {(imagenes.length === 0 && busqueda) ? <p>No hubo resultados</p> : null}

        <ListaImagenes
          imagenes={imagenes}
        />

        {(paginaActual === 1) ? null : 
          <button
            type="button"
            className="btn btn-info"
            onClick={paginaAnterior}
          >
            &laquo; Anterior 
          </button>
        }

        {
          (paginaActual === totalPaginas)? null :
          <button
            type="button"
            className="btn btn-info"
            onClick={paginaSiguiente}
          >
            Siguiente &raquo;
          </button>
        }
      </div>
    </div>
  );
}

export default App;
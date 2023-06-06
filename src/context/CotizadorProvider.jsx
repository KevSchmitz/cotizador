import { createContext, useState } from "react";
import {
  calcularMarca,
  calcularPlan,
  formatearDinero,
  obtenerDiferenciaYear,
} from "../helpers";

export const CotizadorContext = createContext();

export const CotizadorProvider = ({ children }) => {
  // el provider es de donde salen los datos

  const [datos, setDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });

  const [error, setError] = useState("");
  const [resultado, setResultado] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleChangeDatos = (e) => {
    setDatos({
      ...datos, // Lo ideal es tomar un copia de lo que haya antes, porque sino solo toma el valor marcado y borra el resto, dejando siempre el último valor marcado
      [e.target.name]: e.target.value,
    });
  };

  const cotizarSeguro = () => {
    // Una base
    let resultado = 2000;

    // Obtener diferencia de años
    const diferencia = obtenerDiferenciaYear(datos.year);

    // Hay que restar el 3% por cada año
    resultado -= ((diferencia * 3) / 100) * resultado;

    // Americano 15%
    // Europeo 30%
    // Asiático 5%
    resultado *= calcularMarca(datos.marca);

    // Básico 20%
    // Completo 50%
    resultado *= calcularPlan(datos.plan);

    // resultado = resultado.toFixed(2); // Permite que sean 2 decimales
    // Hay una manera mas nueva para formatear el resultado y colocar los decimales

    // Formatear resultado
    resultado = formatearDinero(resultado);

    // Añadiendo un loader para simular que está calculando y añadiendo spinner

    setCargando(true);

    setTimeout(() => {
      setCargando(false);
      setResultado(resultado);
    }, 3000);
  };

  return (
    <CotizadorContext.Provider
      value={{
        cargando,
        cotizarSeguro,
        datos,
        error,
        setError,
        handleChangeDatos,
        resultado,
      }}
    >
      {children}
    </CotizadorContext.Provider>
  );
};

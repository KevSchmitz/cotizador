import { useCallback, useMemo, useRef } from "react";
import { MARCAS, PLANES } from "../constants";
import { useCotizador } from "../hooks/useCotizador";

export const Resultado = () => {
  const { resultado, datos } = useCotizador();
  const { marca, plan, year } = datos;
  // Para evitar el re-render, devuelve un objeto ref mutable, el objeto devuelto se mantendrá persistente durante la vida completa del componente
  // Lo usamos ya que year no es una función a diferencia de useCallback que se usa con funciones
  const yearRef = useRef(year);

  // El useCallback lo usamos para hacer re-renders innecesarios, lo usamos porque en este caso porque necesita de una función, y cambia cuando cambia la dependencia 'useCallback(fn,dep)'
  const [nombreMarca] = useCallback(
    MARCAS.filter((m) => m.id === Number(marca)),
    // La dependencia me sirve para cuando dejo de devolver la versión cacheada y vuelvo hacer re-render
    [resultado]
  ); // Se coloca un 'MARCAS' en mayuscula porque es una constante
  // Ya que el valor de marca es un numero y que aparte viene en un string, para obtener el nombre se hace filtro y como el valor de marca es un string se pasa a numero con el metodo NUMBER.
  // Se aplica destructuring de objeto ya que 'filter' te trae un array, por lo que al aplicar el destructuring no necesitas acceder al array y te trae el objeto directamente.
  // Otra forma seria con nombreMarca[0], sin apicar el destructuring.

  const [nombrePlan] = useCallback(
    // useMemo tiene un 'return' implicito, por eso se usa el '()=>'
    PLANES.filter((p) => p.id === Number(plan)),
    [resultado]
  );

  return (
    <div className="bg-gray-100 text-center mt-5 p-5 shadow">
      <h2 className="text-gray-600 font-black text-3xl">Resumen</h2>
      <p className="py-2">
        <span className="font-bold ">Marca: </span>
        {nombreMarca.nombre}
      </p>
      <p className="py-2">
        <span className="font-bold ">Plan: </span>
        {nombrePlan.nombre}
      </p>
      <p className="py-2">
        <span className="font-bold ">Año del auto: </span>
        {yearRef.current /* yearRef.current es el valor actual */}
      </p>
      <p className="py-2 text-2xl">
        <span className="font-bold ">Total Cotización: </span>
        {resultado}
      </p>
    </div>
  );
};

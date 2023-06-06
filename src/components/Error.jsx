import { useCotizador } from "../hooks/useCotizador";

export const Error = () => {
  const { error } = useCotizador();
  return (
    <div className="bg-red-100 border border-red-800 text-red-700 text-center uppercase font-bold p-3">
      <p>{error}</p>
    </div>
  );
};

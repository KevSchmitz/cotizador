export function obtenerDiferenciaYear(year) {
  return new Date().getFullYear() - year
}

export function calcularMarca(marca) { // En el video se usó un switch, otra forma de multiples if y opciones es con un objeto 

  const marcas = {
    '1': 1.3,
    '2': 1.15,
    '3': 1.05,
  }

  let incremento = marcas[marca] // Otra forma de acceder a la propiedad de un objeto es por medio de '[]' y permite que sea dinámica la selección
  return incremento
} 

export function calcularPlan(plan) {
  return plan === '1' ? 1.2 : 1.5
}

export function formatearDinero(cantidad) {
  return cantidad.toLocaleString('es-AR',{
    style: "currency",
    currency: "ARS"
  })
}
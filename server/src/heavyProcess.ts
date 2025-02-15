const { parentPort } = require("worker_threads");

// Source:
// https://stackoverflow.com/questions/15317464/how-to-have-heavy-processing-operations-done-in-node-js

function initCalculoPesado() {

setInterval(() => console.log('Devuelvo el control al main thread'), 500);

function *calcularProcesoPesado() {
  console.log('Entro al calculo pesado')
    for (let i = 0; i < 100000; i++) {

      if(i % 1000 === 0) yield proceso(i)

    }
    parentPort.postMessage("Cálculo terminado");
}

function proceso(i) {

    console.log(`Calculo pesado ${i}`)
    setTimeout(() => gen.next(`blocked: ${i}`), 500)
}

  const gen = calcularProcesoPesado();

  console.log('El main thread tiene el control')

  gen.next();

}

// Ejecutar el cálculo
initCalculoPesado();

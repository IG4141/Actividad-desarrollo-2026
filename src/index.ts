import {
  Aeroplano,
  Alas,
  Cubierta,
  Escuadron,
  Helice,
  TallerDiagnostico,
  TrenDeAterrizaje,
  Turbina,
} from "./modelos";

// Ejemplo original (hélice + partes agregadas + cubierta explícita)
const helice = new Helice(3);
const trenAterrizaje = new TrenDeAterrizaje(2, 3, true);
const alas = new Alas(2, 3);
const cubierta = new Cubierta(true, true, true, 4, 4);

const aeroplano = new Aeroplano(helice, trenAterrizaje, alas, cubierta);
console.log(aeroplano.toString());
console.log(TallerDiagnostico.diagnosticar(aeroplano));

// Misma jerarquía con Turbina (subclase de ComponentePropulsion)
const turbina = new Turbina(2);
const aeroplanoJet = Aeroplano.fabricarConCubierta(
  turbina,
  new TrenDeAterrizaje(3, 3, true),
  new Alas(2, 1),
  false,
  true,
  true,
  2,
  2
);
console.log("\n--- Avión a reacción ---\n" + aeroplanoJet.toString());
console.log(TallerDiagnostico.diagnosticar(aeroplanoJet));

// Agregación: escuadrón contiene referencias a aviones existentes
const escuadron = new Escuadron("Alfa");
escuadron.agregarAvion(aeroplano);
escuadron.agregarAvion(aeroplanoJet);
console.log("\n" + escuadron.toString());

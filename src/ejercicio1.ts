class Turbina {
  private numTurbinas = 0;

  public constructor(n: number) {
    this.numTurbinas = n;
  }

  public toString(): string {
    return this.numTurbinas + " turbina/s";
  }
}

class Helice {
  private numHelices = 0;

  public constructor(n: number) {
    this.numHelices = n;
  }

  public toString(): string {
    return this.numHelices + " hélice/s";
  }
}

class TrenDeAterrizaje {
  private numNeumaticos = 0;
  private numAmortiguadores = 0;
  private fijoRetractil = false;

  public constructor(a: number, b: number, c: boolean) {
    this.numNeumaticos = a;
    this.numAmortiguadores = b;
    this.fijoRetractil = c;
  }

  public toString(): string {
    let mensaje = "Tren de aterrizaje compuesto por: ";
    if (this.fijoRetractil) {
      mensaje += "con tren retráctil, ";
    }
    mensaje +=
      this.numNeumaticos +
      " neumáticos, " +
      this.numAmortiguadores +
      " amortiguadores.";
    return mensaje;
  }
}

class Cubierta {
  private cabinaTripulacion = false;
  private cabinaVuelo = false;
  private sistemaEmergencia = false;
  private numTanquesCombustible = 0;
  private numPuertasSalidas = 0;

  public constructor(
    pCabinaTripulacion: boolean,
    pCabinaVuelo: boolean,
    pSistemaEmergencia: boolean,
    pTanquesCombustible: number,
    pPuertasSalida: number
  ) {
    this.cabinaTripulacion = pCabinaTripulacion;
    this.cabinaVuelo = pCabinaVuelo;
    this.sistemaEmergencia = pSistemaEmergencia;
    this.numTanquesCombustible = pTanquesCombustible;
    this.numPuertasSalidas = pPuertasSalida;
  }

  public toString(): string {
    let mensaje = "Cubierta compuesta de: ";
    if (this.cabinaVuelo) {
      mensaje += "cubierta de vuelo, ";
    }
    if (this.cabinaTripulacion) {
      mensaje += "cubierta de tripulación, ";
    }
    if (this.sistemaEmergencia) {
      mensaje += "sistema de emergencia, ";
    }
    mensaje += this.numTanquesCombustible + " tanques de combustible, ";
    mensaje += this.numPuertasSalidas + " puertas de salida.";
    return mensaje;
  }
}

class Alas {
  private numAlasFrente = 0;
  private numAlasCola = 0;

  public constructor(mAlasFrente: number, nAlasCola: number) {
    this.numAlasFrente = mAlasFrente;
    this.numAlasCola = nAlasCola;
  }

  public toString(): string {
    return (
      "Alas frontales: " +
      this.numAlasFrente +
      ", alas de cola: " +
      this.numAlasCola
    );
  }
}

class Aeroplano {
  private helice: Helice;
  private trenAterrizaje: TrenDeAterrizaje;
  private alas: Alas;
  private cubierta: Cubierta;

  public constructor(
    pHelice: Helice,
    pTrenAterrizaje: TrenDeAterrizaje,
    pAlas: Alas,
    pCubierta: Cubierta
  ) {
    this.helice = pHelice;
    this.trenAterrizaje = pTrenAterrizaje;
    this.alas = pAlas;
    this.cubierta = pCubierta;
  }

  public toString(): string {
    let mensaje = "Aeroplano compuesto por: ";
    mensaje += this.helice.toString() + ". ";
    mensaje += this.alas.toString() + ". ";
    mensaje += this.trenAterrizaje.toString() + ". ";
    mensaje += this.cubierta.toString();
    return mensaje;
  }
}

const helice = new Helice(3);
const trenAterrizaje = new TrenDeAterrizaje(2, 3, true);
const alas = new Alas(2, 3);
const cubierta = new Cubierta(true, true, true, 4, 4);

const aeroplano = new Aeroplano(helice, trenAterrizaje, alas, cubierta);
console.log(aeroplano.toString());

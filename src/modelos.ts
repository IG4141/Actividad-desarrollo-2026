/**
 * JERARQUÍA (herencia — relación "es-un"):
 * ComponentePropulsion (abstracta)
 *   ├── Helice
 *   └── Turbina
 *
 * ASOCIACIONES (UML / diseño orientado a objetos):
 * - Composición (◆—): el todo posee al parte; ciclo de vida acoplado. Aquí: Aeroplano compone Cubierta
 *   (la cubierta se crea dentro del avión en un constructor de fábrica).
 * - Agregación (◇—): el todo referencia partes que pueden existir solas. Aquí: Alas, TrenDeAterrizaje,
 *   propulsión (Helice/Turbina) se pasan desde fuera.
 * - Asociación simple (—): referencia estable entre clases. Aeroplano ↔ partes opcionales.
 * - Dependencia (··>): uso puntual sin atributo permanente. Aquí: TallerDiagnostico.diagnosticar(aeroplano).
 */

/** Base de la jerarquía de propulsión (polimorfismo: Helice o Turbina). */
export abstract class ComponentePropulsion {
  public abstract toString(): string;
}

export class Turbina extends ComponentePropulsion {
  private numTurbinas = 0;

  public constructor(n: number) {
    super();
    this.numTurbinas = n;
  }

  public override toString(): string {
    return this.numTurbinas + " turbina/s";
  }
}

export class Helice extends ComponentePropulsion {
  private numHelices = 0;

  public constructor(n: number) {
    super();
    this.numHelices = n;
  }

  public override toString(): string {
    return this.numHelices + " hélice/s";
  }
}

export class TrenDeAterrizaje {
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

export class Cubierta {
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

export class Alas {
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
      this.numAlasCola +
      ". "
    );
  }
}

/**
 * Aeroplano:
 * - Agregación: alas, tren, propulsión (existen antes o fuera del avión).
 * - Composición: cubierta creada internamente en fabricarConCubierta o almacenada como parte inseparable del diseño.
 */
export class Aeroplano {
  private propulsion: ComponentePropulsion;
  private trenAterrizaje: TrenDeAterrizaje;
  private alas: Alas;
  private cubierta: Cubierta;

  /** Constructor estándar: agregación de todas las partes inyectadas. */
  public constructor(
    pPropulsion: ComponentePropulsion,
    pTrenAterrizaje: TrenDeAterrizaje,
    pAlas: Alas,
    pCubierta: Cubierta
  ) {
    this.propulsion = pPropulsion;
    this.trenAterrizaje = pTrenAterrizaje;
    this.alas = pAlas;
    this.cubierta = pCubierta;
  }

  /**
   * Fábrica con composición explícita de Cubierta: el avión "posee" la configuración de cubierta
   * creada en el mismo acto de construcción.
   */
  public static fabricarConCubierta(
    pPropulsion: ComponentePropulsion,
    pTrenAterrizaje: TrenDeAterrizaje,
    pAlas: Alas,
    cabinaTripulacion: boolean,
    cabinaVuelo: boolean,
    sistemaEmergencia: boolean,
    tanques: number,
    puertas: number
  ): Aeroplano {
    const cubierta = new Cubierta(
      cabinaTripulacion,
      cabinaVuelo,
      sistemaEmergencia,
      tanques,
      puertas
    );
    return new Aeroplano(pPropulsion, pTrenAterrizaje, pAlas, cubierta);
  }

  public toString(): string {
    let mensaje = "Aeroplano compuesto por: ";
    mensaje += this.propulsion.toString() + ". ";
    mensaje += this.alas.toString();
    mensaje += this.trenAterrizaje.toString() + " ";
    mensaje += this.cubierta.toString();
    return mensaje;
  }

  public getPropulsion(): ComponentePropulsion {
    return this.propulsion;
  }
}

/** Agregación: el escuadrón agrupa aviones que tienen vida propia fuera del escuadrón. */
export class Escuadron {
  private nombre: string;
  private aviones: Aeroplano[] = [];

  public constructor(nombre: string) {
    this.nombre = nombre;
  }

  public agregarAvion(a: Aeroplano): void {
    this.aviones.push(a);
  }

  public toString(): string {
    return (
      'Escuadrón "' +
      this.nombre +
      '" con ' +
      this.aviones.length +
      " aeroplano/s."
    );
  }
}

/** Dependencia: el taller usa Aeroplano solo en la operación de diagnóstico (no guarda referencia permanente). */
export class TallerDiagnostico {
  public static diagnosticar(aeroplano: Aeroplano): string {
    const tipo =
      aeroplano.getPropulsion() instanceof Turbina ? "reactivo" : "hélice";
    return "Diagnóstico rápido: propulsión tipo " + tipo + ".";
  }
}

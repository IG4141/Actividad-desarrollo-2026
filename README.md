#### Ivo Giuliano Cappetto

La actividad fue desarrollada localmente en el archivo:

* `dist/ejercicio1.js`

### Ejecución

```bash
node dist/ejercicio1.js
```

---

## 2. Identificación de relaciones de jerarquía

Se implementó una estructura jerárquica mediante herencia:

* `VehiculoAereo` → Superclase principal.
* `Aeroplano` → Subclase de `VehiculoAereo`.
* `Jet` → Subclase de `VehiculoAereo`.

---

## 3. Implementación de relaciones entre clases

### Herencia

Las clases `Aeroplano` y `Jet` heredan de `VehiculoAereo`.

### Composición

La clase `Aeroplano` está compuesta por:

* `Helice`
* `TrenDeAterrizaje`
* `Alas`
* `Cubierta`

### Agregación

La clase `Aerolinea` agrega aeronaves a su flota mediante el método:

```js
agregarAeronave()
```

### Asociación

La clase `Aeroplano` se relaciona con `Piloto` mediante:

```js
asignarPiloto()
```

### Dependencia

La clase `Aeroplano` depende de `TecnicoMantenimiento` mediante:

```js
planificarMantenimiento(tecnico)
```

---

## 5. Diferencia en tiempo de ejecución: Composición vs Agregación
La composición y la agregación no poseen una diferencia fija de tiempo de ejecución.

La composición implica que los objetos internos dependen del objeto principal y suelen crearse o destruirse junto con él.

La agregación permite que los objetos asociados existan de forma independiente y puedan reutilizarse.

Por ello, el rendimiento depende de la implementación concreta, la cantidad de objetos creados, el uso de memoria y el lenguaje utilizado, más que del tipo de asociación en sí.

Se incorporó un benchmark en `dist/ejercicio1.js` para comparar ambas estrategias.

### Configuración utilizada

* 100000 objetos por repetición
* 8 repeticiones

### Resultados obtenidos

| Métrica         | Composición | Agregación |
| --------------- | ----------- | ---------- |
| Tiempo promedio | 74.09 ms    | 6.65 ms    |
| Uso de memoria  | 59.22 MB    | 25.19 MB   |

En esta ejecución, la agregación fue significativamente más rápida que la composición.

La composición también consumió más memoria total, debido a la creación de nuevos objetos internos en cada instancia.

La agregación, al reutilizar objetos existentes, redujo el tiempo de procesamiento y mejoró el rendimiento general.

---

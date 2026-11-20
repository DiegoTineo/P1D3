# Proyecto de la Unidad 1: Archivos Leonida (Pilas, Colas y Bicolas)

**Algoritmos y Estructura de Datos III** — Enunciado interactivo del Proyecto 1.

- **Sitio web publicado:** [https://diegotineo.github.io/P1D3/](https://diegotineo.github.io/P1D3/)
- **Archivo de entrada:** [`public/transmisiones.txt`](./public/transmisiones.txt)

---

## Contexto de la Historia
**Año 2026.** Como analista de ciberinteligencia, interceptaste `transmisiones.txt`: un expediente confidencial filtrado que oculta **imágenes**, **reportes encriptados** y una **pista de audio**. La señal llegó dividida en **3 canales**, contaminada con **señuelos** y alterada por **jammers** que invierten el orden en tránsito.

**Tu misión:** construir una app en **C# (Windows Forms)** que ejecute el descifrado **etapa por etapa** hasta revelar el expediente en un **carrusel circular** (`Bicola<Pagina>`) con audio en paralelo.

---

## El Problema
La estación de inteligencia solo dispone de **2 máquinas compartidas** para procesar los paquetes provenientes de los **3 canales de frecuencia**. Al ser recursos compartidos, es estrictamente obligatorio modelar el acceso mediante **colas**:

1. **Buffer de Guardado (`ColaGuardado`):** Recibe todos los paquetes útiles (`AUDIO`, `IMAGEN` y `TEXTO`) en orden cronológico.
2. **Filtro de Descarte / Señuelos (`ColaEliminados`):** Recibe exclusivamente paquetes con operación `DESTRUIR`.

---

## Requisitos Técnicos y Arquitectura Obligatoria
- **Lenguaje y entorno:** C# con **Windows Forms** (`.NET`), sin instalar paquetes NuGet externos.
- **Prohibido usar estructuras preconstruidas de .NET:** No se permite importar ni utilizar `Stack<T>`, `Queue<T>`, `LinkedList<T>` (de `System.Collections.Generic`), `Stack` / `Queue` (de `System.Collections`) ni sus variantes en `System.Collections.Concurrent`. **Debes implementar cada TDA desde cero manualmente.**
- **Tipos de Datos Abstractos (TDA):** Cada TDA debe estar implementado manualmente en su propio archivo utilizando **Generic Types (`<T>`)**:
  - `Bicola.cs`
  - `PilaConBicola.cs`
  - `ColaConBicola.cs`
- **Rendimiento obligatorio (`StringBuilder`):** Prohibido concatenar `string` con `+=` dentro de bucles. Toda acumulación de caracteres o texto debe hacerse con `System.Text.StringBuilder` (`O(n)`).

---

## Pipeline del Proyecto

### Fase 1 — `FileReader(ruta) → string`
Lee el archivo único **`transmisiones.txt`** y carga su contenido para pasarlo a la siguiente fase.
- **Interacción obligatoria:** La aplicación debe cargar el archivo **solo al hacer clic** y mostrar su contenido en pantalla antes de continuar.

### Fase 2 — `FileProcessor(contenido) → (canal1, canal2, canal3)`
Recorre el archivo línea por línea, extrae cada `Registro` usando **`PilaConBicola<char>`** + **`StringBuilder`** y lo encola inmediatamente en su canal correspondiente (**1, 2 o 3**).

- `()` → `id` (`int`) — Identificador único del registro.
- `[]` → `canal` (`int · 1..3`) — Cola de canal destino (1, 2 o 3).
- `<>` → `operacion` (`string`) — `AUDIO`, `IMAGEN`, `TEXTO`, `DESTRUIR` o `INVERTIR`.
- `{}` → `payload` (`string`) — Base64 directo en `AUDIO`/`IMAGEN`, texto invertido en `TEXTO`/`DESTRUIR`, vacío en `INVERTIR`.

- **Regla del extractor con pila:** Al encontrar `(`, `[`, `<` o `{`, apilarlo en `PilaConBicola<char>` y acumular los caracteres en `StringBuilder` hasta encontrar el cierre correspondiente `)`, `]`, `>` o `}`, desapilarlo y asignar el campo.
- **Interacción y visualización obligatoria:** Debe ejecutarse **al hacer clic** y mostrar en pantalla el contenido de las **3 colas de canales** (`canal1`, `canal2` y `canal3`), implementando un método adicional en los TDAs para recorrer y mostrar sus elementos sin perderlos.

### Fase 3 — `RoundRobinSimulator(canal1, canal2, canal3) → (colaGuardado, colaEliminados)`
Ejecuta un ciclo `while` hasta que los **3 canales estén vacíos**, desencolando exactamente **1 registro por canal en orden estricto** (`1 → 2 → 3 → 1 → 2 → 3 ...`):
- `AUDIO`, `IMAGEN`, `TEXTO` → se encola en `colaGuardado`.
- `DESTRUIR` → se encola en `colaEliminados`.
- `INVERTIR` *(jammer)* → invierte el lote actual de `colaGuardado` (desencolar todo → apilar en `PilaConBicola<Registro>` → desapilar y volver a encolar) y descarta el registro `INVERTIR`.
- **Regla estricta:** Prohibido vaciar un canal completo antes de pasar al siguiente.

### Fase 4 — `Destroyer(colaEliminados) → string`
Vacía `colaEliminados` y genera el reporte de registros descartados.
- **Confirmación obligatoria:** Primero deben mostrarse en pantalla cada uno de los registros en `colaEliminados`. La eliminación **no debe ejecutarse directamente**: el usuario debe **aceptar / confirmar la destrucción** para vaciar la cola y emitir el reporte.

### Fase 5 — `StoryBuilder(colaGuardado) → (Bicola<Pagina>, audioBase64)`
Recorre `colaGuardado` en un solo ciclo `while (!colaGuardado.EstaVacia())` manteniendo `Image? imagenActual = null` y `string audioBase64 = ""`:
- `AUDIO` → guarda `audioBase64 = reg.Payload`.
- `IMAGEN` → decodifica Base64 a `Bitmap` (`Convert.FromBase64String → MemoryStream → new Bitmap(Image.FromStream(ms))`) y actualiza `imagenActual`.
- `TEXTO` → desencripta `reg.Payload` invirtiendo sus caracteres con `PilaConBicola<char>` + `StringBuilder`, crea `new Pagina(numero++, total, imagenActual, texto)` y la inserta con `bicolaPaginas.InsertarFinal(pagina)`.

> **Importante:** Solo se inserta una `Pagina` en `bicolaPaginas` cuando el registro es `TEXTO`. Los registros `IMAGEN` únicamente actualizan `imagenActual` (no crean páginas) y `AUDIO` únicamente almacena la pista de fondo.

### Fase 6 — `Carousel(bicolaPaginas, audioBase64)`
Recibe únicamente `bicolaPaginas` y `audioBase64`. Muestra siempre `bicolaPaginas.VerFrente()` (imagen arriba, descripción abajo) y logra el efecto circular rotando directamente la bicola (sin índices ni `List<T>`). Además de los botones en pantalla, debe permitir desplazarse con las **flechas direccionales del teclado** (`←` / `→`):
- **`Siguiente >`:** `EliminarFrente()` → `InsertarFinal()` → mostrar `VerFrente()`.
- **`< Anterior`:** `EliminarFinal()` → `InsertarFrente()` → mostrar `VerFrente()`.
- **Audio en paralelo:** Reproducción en bucle sin NuGet con `winmm.dll` (`.NET Framework 4.x` a `.NET 10`), deteniendo siempre el audio en el evento `FormClosing`.

---

## Formato de Entrega
- **Video demostrativo subido a YouTube o Google Drive** (tope máximo: **20 minutos**) acompañado del enlace al **repositorio de GitHub** con el código fuente, incluyendo obligatoriamente:
  1. **Corrida en frío y defensa / explicación del código.**
  2. **Demostración de la ejecución completa del proyecto.**
- **Política de entregas demoradas:** Pasadas las **12:00 PM** se resta **1 punto por cada día de retraso**, con un tope máximo de **4 días (-4 puntos)**. Se tomará en cuenta tanto la **fecha de subida del video** como la **fecha de los commits en el repositorio de GitHub**.

---

## ¿Qué aprendes con este proyecto?
1. Tipos de Datos Abstractos (TDAs) desde cero (`Bicola<T>`, `PilaConBicola<T>`, `ColaConBicola<T>`).
2. Tipos de Datos Genéricos (`<T>`).
3. Programación Orientada a Objetos (POO).
4. Programación Orientada a Eventos.
5. C# y .NET Windows Forms.
6. Manejo de Base64 e Imágenes en Memoria (`MemoryStream`, `Bitmap`).
7. Manejo de Audio e Interoperabilidad Nativa (P/Invoke con `winmm.dll`).
8. Complejidad Algorítmica y `StringBuilder`.
9. Parsing y Validación de Delimitadores con Pilas.
10. Planificación Round-Robin.
11. Navegación Circular sobre Bicolas.
12. Arquitectura en Pipeline (Etapas Desacopladas).
13. Git, GitHub y Trabajo en Equipo.

---

> *"La programación no se trata de lo que sabes, sino de lo que puedes averiguar."* — **Chris Pine**

*Con cariño, dedico este proyecto a mis alumnos, con el fin de que comprendan que incluso las cosas más simples, con un poco de ingenio, pueden convertirse en algo genial.*  
**Prof. Diego Tineo**

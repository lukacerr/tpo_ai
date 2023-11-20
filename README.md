# TPO Aplicaciones Interactivas

#### Integrantes

- Cerrutti Luka
- González Francisco Ezequiel
- Caceres Augusto
- Monti Nahuel Matías
- Gómez José Francisco

### Consigna

Se encuentra en el archivo [Consigna.docx](Consigna.docx)

##### Requisitos del workspaces

- [NodeJS](https://nodejs.org/en/download) + npmjs
- Containerising compatible con Docker Compose
  - Recomendable [Docker Desktop](https://www.docker.com/products/docker-desktop/)

---

## Instancia de desarrollo (+hot reload)

El siguiente comando desde el root del repo disparará el compose para usuarios de Docker como tecnología de containerising.

```
npm run dev
```

> Nota: El comando `npm run devd` iniciará los containers sin bindear la terminal actual a la instancia.

#### Esquema de datos, DAOs & DTOs

Utilizamos [Prisma ORM](https://www.prisma.io/docs) el cual se encarga de generar DAOs y DTOs para reciclar entre el front y el back.

_La estructura está construida en el archivo [schema.prisma](./prisma/schema.prisma)._

> Ante un cambio a la estructura de los datos, se tendrá que levantar manualmente el servicio `data_commons`. Para aquellos utilizando Docker, se podrá ejecutar el siguiente script:

```
npm run pref
```

##### Nota al inicializar

El primer usuario tendrá que ser creado a mano (mediante el endpoint `/users/register`), enviando via body un objeto basado en el siguiente formato:

```ts
username: 'string';
password: 'string';
name: 'string';
isAdmin: true;
```

Con esto ya podremos acceder a la plataforma y trabajar como administrador con el usuario dado.

###### NOTA IMPORTANTE -> TODOs a conciencia

Dando multiples acontecimientos de cara a esta segunda entrega (principalmente demanda en parciales/finales de otras materias así como la situación política y económica actual del país) hay ciertas cosas del frontend que quedaron entre incompletas o sencillamente mal realizadas. A su vez, múltiples funcionalidades quedaron en TODO, tal y como se ve en la sidebar.

No obstante, consideramos que la entrega actual no está exageradamente lejos de cumplir con lo mínimo e indispensable basado en los criterios de aprobación.

Ante situación de potencial insatisfacción, nótese que, si se necesitan correciones y/o features nuevas para aprobar, pedimos encarecidamente si se nos puede ceder algo de tiempo extra, y atenderemos los reclamos pedidos lo antes posible.

**LISTADO TODOs & FIXMEs:**

- Véase las múltiples features TODOs marcadas sobre la sidebar.
- Falta crear una interfaz para el panel; hace las queries y tiene las funcionalidades pero muestra JSON raw.
- Al crear/editar edificio, pide un JSON raw para las comodidades y las unidades del mismo.
  - Se tendría que hacer una interfaz intuitiva para esto.
- En **Reclamos -> Generar reclamo**, te pide el ID raw de la unidad o comodidad en vez de un selector.
- Falta hacer la pantalla **Reclamos -> Administrar** (solo para administradores), desde la cual se podría responder o cambiar el estado de los reclamos.

_Tendemos a creer que, desde la API, todo está OK en base a lo pedido._

Pedimos perdón por los inconvenientes generados.

> _Saludos, Grupo #3._

### Ejemplo vago de flujos varios (teóricos)

1. Desde [el front](http://localhost:3000/), ingresamos con la cuenta de administrador que creamos.
2. En la sidebar, vamos a **Usuarios -> [Registrar nuevo](http://localhost:3000/register)**. Creemos un conjunto de nuevos usuarios desde aquí.
3. Devuelta en la sidebar, vamos a **Edificios -> [Crear nuevo](http://localhost:3000/building)**. Desde aquí crearemos (o editaremos edificios, así como sus comodidades, sus unidades, usuarios asignados a sus unidades y roles de los mismo en relación a las unidades).
4. Yendo a **Reclamos -> [Generar reclamo](http://localhost:3000/claim)**, podrémos crear un reclamo a una comodidad o unidad relacionado al usuario con el que estamos loggeados.
5. Como usuarios podemos ir al [panel](http://localhost:3000/panel), desde aquí viendo propiedades/comodidades relacionadas al usuario, así como reclamos activos.
6. Como administradores, podemos ir a **Reclamos -> [Administrar](http://localhost:3000/review)** y desde aquí visualizar la información del reclamo, así como modificar su status.

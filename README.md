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

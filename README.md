# BE-AD-POS-ATENDEDOR-MS

## Descripción

Microservicio destinado a la inserción y actualización de los registros de los Atendedores, esto en la tabla **[be-ad-api-pos-atendedores]** de DynamoDb.

## Configuración

Este Microservicio no requiere mayor configuración, salvo la consideración de que para poder hacer uso de él se requiere estar en la red interna **(CITRIX)** y tener en el entorno las credenciales de la cuenta AWS.

### Ejecución local

La ejecucion local no considera características  especiales salvo las mencionadas en el apartado de configuración.

```bash
npm run start
```

## Operaciones

- **Operación**
  - Almacena atendedor (inserta o actualiza)
- **Descripción Capacidad**
  - **[P E N D I E N T E]**
- **Sistemas Involucrados**
  - **[P E N D I E N T E]**

### API Specs

- **Verbo**
  - POST

- **PATH**
  - /microservicio/v1/be-ad-pos-atendedor-ms/atendedor

- **Parametros**
  - idComercio
  - numeroAtendedor

- **Descripción parámetro**
  - **idComercio**: Id del comercio.
  - **numeroAtendedor**: Número del atendedor (de 1 a 99)

### Ownership

- **Mantenedor**:
  - Aquiles Jose Martinez Ugas - amarti24@externos.bancoestado.cl
  - Samuel Barrera Bastidas - sbarrer4@externos.bancoestado.cl

- **Business Owner**:
  - Maria Candelaria Arrieta del Rio - maria.arrieta@compraqui.cl

- **Equipos**:
  - Aquiles Jose Martinez Ugas - amarti24@externos.bancoestado.cl
  - Samuel Barrera Bastidas - sbarrer4@externos.bancoestado.cl

---

> Plantilla generada el 05/Oct/2022 por Arquitectura Tecnológica
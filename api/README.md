<p align='left'>
    <img src='https://lh3.googleusercontent.com/proxy/k9zYXl1K0lc806iQTIKIOkXCsRk5D1U9LerllOSEaa-kW6BYJ3mV79kVATdXmzFakMtG2A4uL4Hg3ggZSIjmim__kPyuAVfEWrDzCP01tz9oMDs3eLw3D1FW-UJX7DX_go0tnu-xZVVQ' </img>
</p>

# api

Este es un proyecto de Node basado en [Express](https://expressjs.com/).

# ORM
Utilizamos [Sequelize](https://sequelize.org/).



## Mixins
- **db.mixin**: Database access mixin for services. Based on [moleculer-db](https://github.com/moleculerjs/moleculer-db#readme)


## NPM scripts

- `npm run dev`: Inicia el modo de desarrollo (load all services locally with hot-reload & REPL)
- `npm run start`: Inicia el modo de producción (set `SERVICES` env variable to load certain services)
- `npm run cli`: Inicia un CLI y conecta a producción. Don't forget to set production namespace with `--ns` argument in script
- `npm run lint`: Run ESLint
- `npm run ci`: Run continuous test mode with watching
- `npm test`: Run tests & generate coverage report
- `npm run dc:up`: Start the stack with Docker Compose
- `npm run dc:down`: Stop the stack with Docker Compose

import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { expeditionsRoutes } from './http/controllers/expeditions/routes'
import { spaceshipsRoutes } from './http/controllers/spaceships/routes'
import { launchesRoutes } from './http/controllers/launches/routes'

export const app = fastify()

app.register(expeditionsRoutes)
app.register(spaceshipsRoutes)
app.register(launchesRoutes)

app.setErrorHandler((error, _, reply) => {
  // colocando _ ao invés do parametro certo(que seria request),
  // pois nao vamos usar o request e nao quero que fique dando erro,
  // entao podemos simplesmente colocar o _
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  // formatando erro do zod, o error.format é do proprio zod para ficar
  // mais agradavel e legivel o erro

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }
  // se nao estivermos em produçao(ou seja, dev), mostra o erro no console
  // para uma melhor visualizaçao
  return reply.status(500).send({ message: 'Internal server error.' })
})

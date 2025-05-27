import fastify from 'fastify'
import cors from '@fastify/cors'
import { ZodError } from 'zod'
import { env } from './env'
import { expeditionsRoutes } from './http/controllers/expeditions/routes'
import { spaceshipsRoutes } from './http/controllers/spaceships/routes'
import { launchesRoutes } from './http/controllers/launches/routes'

export const app = fastify()

// Habilita CORS para todos os domínios (pode configurar abaixo)
app.register(cors, {
  origin: '*', // ou 'http://localhost:4200' para permitir só o frontend
})

app.register(expeditionsRoutes)
app.register(spaceshipsRoutes)
app.register(launchesRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Log to external tools like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})

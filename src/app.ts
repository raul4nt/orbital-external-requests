import fastify from 'fastify'
import cors from '@fastify/cors'
import { ZodError } from 'zod'
import { env } from './env'
import { expeditionsRoutes } from './http/controllers/expeditions/routes'
import { spaceshipsRoutes } from './http/controllers/spaceships/routes'
import { launchesRoutes } from './http/controllers/launches/routes'
import { astronautsRoutes } from './http/controllers/astronauts/routes'

export const app = fastify()

app.register(cors, {
  origin: '*',
})

app.register(expeditionsRoutes)
app.register(spaceshipsRoutes)
app.register(launchesRoutes)
app.register(astronautsRoutes)

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

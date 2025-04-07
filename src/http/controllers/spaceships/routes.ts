import { FastifyInstance } from 'fastify'
import { getSpaceships } from './get-spaceships'

export async function spaceshipsRoutes(app: FastifyInstance) {
  app.get('/spaceships', getSpaceships)
}

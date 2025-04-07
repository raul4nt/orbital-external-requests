import { FastifyInstance } from 'fastify'
import { getLaunches } from './get-launches'

export async function launchesRoutes(app: FastifyInstance) {
  app.get('/launches', getLaunches)
}

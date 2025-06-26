import { FastifyInstance } from 'fastify'
import { getAstronauts } from './get-astronauts'

export async function astronautsRoutes(app: FastifyInstance) {
  app.get('/astronauts', getAstronauts)
}

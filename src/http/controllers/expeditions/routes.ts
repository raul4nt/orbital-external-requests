import { FastifyInstance } from 'fastify'
import { getExpeditions } from './get-expeditions'

export async function expeditionsRoutes(app: FastifyInstance) {
  app.get('/expeditions', getExpeditions)
}

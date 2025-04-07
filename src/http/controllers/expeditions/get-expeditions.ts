import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetExpeditionsListUseCase } from '@/use-cases/factories/make-get-expeditions-list-use-case'

export async function getExpeditions(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getExpeditionsListUseCase = makeGetExpeditionsListUseCase()

    const { expeditions } = await getExpeditionsListUseCase.execute()

    return reply.status(200).send({
      expeditions,
    })
  } catch (err) {
    console.error(err)
    return reply.status(500).send({
      error: 'Erro ao buscar expedições espaciais.',
    })
  }
}

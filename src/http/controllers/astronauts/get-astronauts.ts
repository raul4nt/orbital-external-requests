import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetAstronautsListUseCase } from '@/use-cases/factories/make-get-astronauts-list-use-case'

export async function getAstronauts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAstronautsListUseCase = makeGetAstronautsListUseCase()

    const response = await getAstronautsListUseCase.execute({})

    return reply.status(200).send(response)
  } catch (err) {
    console.error('Erro no controller getAstronauts:', err)
    return reply.status(500).send({
      error: 'Erro interno ao buscar informações dos astronautas.',
    })
  }
}

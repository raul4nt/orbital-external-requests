import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetLaunchesListUseCase } from '@/use-cases/factories/make-get-launches-list-use-case'

export async function getLaunches(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getLaunchesListUseCase = makeGetLaunchesListUseCase()

    const { launches } = await getLaunchesListUseCase.execute({})

    return reply.status(200).send({
      launches,
    })
  } catch (err) {
    console.error(err)
    return reply.status(500).send({
      error: 'Erro ao buscar lançamentos espaciais.',
    })
  }
}

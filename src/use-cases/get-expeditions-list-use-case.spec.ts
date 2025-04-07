import { GetExpeditionsListUseCase } from './get-expeditions-list-use-case'
import { beforeEach, expect, describe, it } from 'vitest'

let sut: GetExpeditionsListUseCase

describe('Get Expeditions List Use Case', () => {
  beforeEach(() => {
    sut = new GetExpeditionsListUseCase()
  })

  it('should be able to list expeditions from external api', async () => {
    const result = await sut.execute({})
    console.log(result)

    expect(result).toEqual(
      expect.objectContaining({
        expeditions: expect.any(Array),
      }),
    )
  }, 10_000)
})

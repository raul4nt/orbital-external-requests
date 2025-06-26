import { GetAstronautsListUseCase } from './get-astronauts-list-use-case'
import { beforeEach, expect, describe, it } from 'vitest'

let sut: GetAstronautsListUseCase

describe('Get Astronauts List Use Case', () => {
  beforeEach(() => {
    sut = new GetAstronautsListUseCase()
  })

  it('should be able to list astronauts from external api', async () => {
    const result = await sut.execute({})

    expect(result).toEqual(
      expect.objectContaining({
        count: expect.any(Number),
        astronauts: expect.any(Array),
      }),
    )

    if (result.astronauts.length > 0) {
      expect(result.astronauts[0]).toHaveProperty('id')
      expect(result.astronauts[0]).toHaveProperty('name')
      expect(result.astronauts[0]).toHaveProperty('agencyName')
    }
  }, 15_000)
})

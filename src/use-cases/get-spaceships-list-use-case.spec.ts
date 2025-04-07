import { GetSpaceshipsListUseCase } from './get-spaceships-list-use-case'
import { beforeEach, expect, describe, it } from 'vitest'

let sut: GetSpaceshipsListUseCase

describe('Get Spaceships List Use Case', () => {
  beforeEach(() => {
    sut = new GetSpaceshipsListUseCase()
  })

  it('should be able to list spaceships from external api', async () => {
    const result = await sut.execute({})
    console.log(result)

    expect(result).toEqual(
      expect.objectContaining({
        spaceships: expect.any(Array),
      }),
    )
  }, 10_000)
})

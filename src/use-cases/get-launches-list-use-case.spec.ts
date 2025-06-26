import { GetLaunchesListUseCase } from './get-launches-list-use-case'
import { beforeEach, expect, describe, it } from 'vitest'

let sut: GetLaunchesListUseCase

describe('Get Launches List Use Case', () => {
  beforeEach(() => {
    sut = new GetLaunchesListUseCase()
  })

  it('should be able to list launches from external api', async () => {
    const result = await sut.execute({})

    expect(result).toEqual(
      expect.objectContaining({
        launches: expect.any(Array),
      }),
    )
  }, 10_000)
})

import { GetAstronautsListUseCase } from '../get-astronauts-list-use-case'

export function makeGetAstronautsListUseCase() {
  const useCase = new GetAstronautsListUseCase()
  return useCase
}

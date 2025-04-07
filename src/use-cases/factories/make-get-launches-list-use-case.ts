import { GetLaunchesListUseCase } from '../get-launches-list-use-case'

export function makeGetLaunchesListUseCase() {
  return new GetLaunchesListUseCase()
}

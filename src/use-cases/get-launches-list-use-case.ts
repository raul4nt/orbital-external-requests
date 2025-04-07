export interface GetLaunchesListRequest {}

export interface LaunchesStatus {
  id: number
  name: string // ex: "Single Use"
}

export interface LaunchesType {
  id: number
  name: string // ex: "Capsule"
}

export interface Agency {
  id: number
  url: string
  name: string // ex: "Russian Federal Space Agency (ROSCOSMOS)"
  type: string // ex: "Government"
}

export interface LaunchesConfig {
  id: number
  url: string
  name: string // ex: "Soyuz MS"
  type: LaunchesType
  agency: Agency
  in_use: boolean
  image_url: string
}

export interface Launches {
  id: number
  url: string
  name: string
  serial_number: string
  is_placeholder: boolean
  in_space: boolean
  time_in_space: string // ISO 8601 duration, ex: "P194DT19H1M41S"
  time_docked: string // ISO 8601 duration
  flights_count: number
  mission_ends_count: number
  status: LaunchesStatus
  description: string
  launches_config: LaunchesConfig
}

export interface GetLaunchesListResponse {
  count: number
  next: string | null
  previous: string | null
  launches: Launches[]
}

export class GetLaunchesListUseCase {
  async execute(_: GetLaunchesListRequest): Promise<GetLaunchesListResponse> {
    try {
      const response = await fetch(
        'https://ll.thespacedevs.com/2.3.0/launches/?mode=detailed',
      )

      if (!response.ok) {
        throw new Error(
          `Erro ao buscar dados da API externa: ${response.status}`,
        )
      }

      const data = await response.json()

      const formatted: Launches[] = data.results.map((expedition: any) => ({
        name: expedition.name,
        start: expedition.start,
        end: expedition.end,
        status: expedition.status?.name,
        crew:
          expedition.crew?.map((member: any) => ({
            name: member.astronaut.name,
            role: member.role,
            agency: member.astronaut.agency?.name,
          })) ?? [],
      }))

      return {
        count: data.count,
        next: data.next,
        previous: data.previous,
        launches: formatted,
      }
    } catch (err) {
      console.error(err)
      throw new Error('Erro ao buscar lançamentos')
    }
  }
}

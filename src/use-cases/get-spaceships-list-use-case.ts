interface GetSpaceshipsListRequest {} // Request vazia

interface Agency {
  id: number
  url: string
  name: string
  type: string
}

interface SpaceshipType {
  id: number
  name: string
}

interface SpaceshipConfig {
  id: number
  url: string
  name: string
  type: SpaceshipType
  agency: Agency
  inUse: boolean
  imageUrl: string
}

interface SpaceshipStatus {
  id: number
  name: string
}

interface Spaceship {
  id: number
  url: string
  name: string
  serialNumber: string
  isPlaceholder: boolean
  inSpace: boolean
  timeInSpace: string // ISO 8601 duration
  timeDocked: string // ISO 8601 duration
  flightsCount: number
  missionEndsCount: number
  status: SpaceshipStatus
  description: string
  config: SpaceshipConfig
}

interface GetSpaceshipsListResponse {
  count: number
  next: string | null
  previous: string | null
  spaceships: Spaceship[]
}

export class GetSpaceshipsListUseCase {
  async execute(
    _: GetSpaceshipsListRequest,
  ): Promise<GetSpaceshipsListResponse> {
    try {
      const response = await fetch(
        'https://ll.thespacedevs.com/2.2.0/spacecraft/',
      )

      if (!response.ok) {
        throw new Error(
          `Erro ao buscar dados da API externa: ${response.status}`,
        )
      }

      const data = await response.json()

      const spaceships: Spaceship[] = data.results.map((s: any) => ({
        id: s.id,
        url: s.url,
        name: s.name,
        serialNumber: s.serial_number,
        isPlaceholder: s.is_placeholder,
        inSpace: s.in_space,
        timeInSpace: s.time_in_space,
        timeDocked: s.time_docked,
        flightsCount: s.flights_count,
        missionEndsCount: s.mission_ends_count,
        status: {
          id: s.status.id,
          name: s.status.name,
        },
        description: s.description,
        config: {
          id: s.spacecraft_config.id,
          url: s.spacecraft_config.url,
          name: s.spacecraft_config.name,
          type: {
            id: s.spacecraft_config.type.id,
            name: s.spacecraft_config.type.name,
          },
          agency: {
            id: s.spacecraft_config.agency.id,
            url: s.spacecraft_config.agency.url,
            name: s.spacecraft_config.agency.name,
            type: s.spacecraft_config.agency.type,
          },
          inUse: s.spacecraft_config.in_use,
          imageUrl: s.spacecraft_config.image_url,
        },
      }))

      return {
        count: data.count,
        next: data.next,
        previous: data.previous,
        spaceships,
      }
    } catch (err) {
      console.error(err)
      throw new Error('Erro ao buscar espaçonaves')
    }
  }
}

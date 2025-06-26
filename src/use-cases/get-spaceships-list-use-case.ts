import fetch from 'node-fetch'

// ===================================================================
// PASSO 1: Criar interfaces que espelham a RESPOSTA CRUA da API
// Note que todas as propriedades estão em snake_case, exatamente como a API retorna.
// ===================================================================

interface ApiAgency {
  id: number
  url: string
  name: string
  type: string
}

interface ApiSpacecraftConfig {
  id: number
  url: string
  name: string
  type: { id: number; name: string }
  agency: ApiAgency
  in_use: boolean
  image_url: string
}

interface ApiSpacecraft {
  id: number
  url: string
  name: string
  serial_number: string
  status: { id: number; name: string }
  description: string
  spacecraft_config: ApiSpacecraftConfig
  is_placeholder: boolean
  in_space: boolean
  time_in_space: string
  time_docked: string
  flights_count: number
  mission_ends_count: number
}

interface ApiListResponse {
  count: number
  next: string | null
  previous: string | null
  results: ApiSpacecraft[]
}

interface Spaceship {
  id: number
  url: string
  name: string
  serialNumber: string
  isPlaceholder: boolean
  inSpace: boolean
  timeInSpace: string
  timeDocked: string
  flightsCount: number
  missionEndsCount: number
  status: { id: number; name: string }
  description: string
  config: {
    id: number
    url: string
    name: string
    type: { id: number; name: string }
    agency: ApiAgency
    inUse: boolean
    imageUrl: string
  }
}

interface GetSpaceshipsListResponse {
  count: number
  next: string | null
  previous: string | null
  spaceships: Spaceship[]
}

interface GetSpaceshipsListRequest {}

export class GetSpaceshipsListUseCase {
  async execute(
    _: GetSpaceshipsListRequest,
  ): Promise<GetSpaceshipsListResponse> {
    try {
      const NASA_AGENCY_ID = 44
      const API_URL = `https://ll.thespacedevs.com/2.2.0/spacecraft/?spacecraft_config__agency__id=${NASA_AGENCY_ID}`

      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error(
          `Erro ao buscar dados da API: ${response.status} ${response.statusText}`,
        )
      }

      // AQUI ESTÁ A CORREÇÃO PRINCIPAL:
      // Usamos "as ApiListResponse" para dizer ao TypeScript:
      // "Eu garanto que o JSON que está vindo tem a estrutura da interface ApiListResponse"
      const data = (await response.json()) as ApiListResponse

      // Agora que 'data' está corretamente tipado, o TypeScript permite acessar 'data.results'
      // e nos dá autocomplete para as propriedades em snake_case.
      const spaceships: Spaceship[] = data.results.map((s) => ({
        id: s.id,
        url: s.url,
        name: s.name,
        description: s.description,
        status: s.status,
        serialNumber: s.serial_number,
        isPlaceholder: s.is_placeholder,
        inSpace: s.in_space,
        timeInSpace: s.time_in_space,
        timeDocked: s.time_docked,
        flightsCount: s.flights_count,
        missionEndsCount: s.mission_ends_count,
        config: {
          id: s.spacecraft_config.id,
          url: s.spacecraft_config.url,
          name: s.spacecraft_config.name,
          type: s.spacecraft_config.type,
          agency: s.spacecraft_config.agency,
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
      console.error('Falha no caso de uso GetSpaceshipsListUseCase:', err)
      throw new Error('Erro ao buscar a lista de espaçonaves.')
    }
  }
}

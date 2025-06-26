import fetch from 'node-fetch'

export interface GetAstronautsListRequest {}

export interface Astronaut {
  id: number
  url: string
  name: string
  status: string
  agencyName: string
  agencyAbbrev: string
  nationality: string
  dateOfBirth: string | null
  bio: string
  wikiUrl: string
  imageUrl: string
  inSpace: boolean
  timeInSpace: string
}

export interface GetAstronautsListResponse {
  count: number
  next: string | null
  previous: string | null
  astronauts: Astronaut[]
}

export class GetAstronautsListUseCase {
  async execute(
    _: GetAstronautsListRequest,
  ): Promise<GetAstronautsListResponse> {
    try {
      const response = await fetch(
        'https://ll.thespacedevs.com/2.3.0/astronauts/',
      )

      if (!response.ok) {
        throw new Error(
          `Erro ao buscar dados da API externa: ${response.status} ${response.statusText}`,
        )
      }

      const data = (await response.json()) as any

      const formattedAstronauts: Astronaut[] = data.results.map(
        (astronaut: any) => ({
          id: astronaut.id,
          url: astronaut.url,
          name: astronaut.name,
          status: astronaut.status?.name,
          agencyName: astronaut.agency?.name,
          agencyAbbrev: astronaut.agency?.abbrev,
          nationality: astronaut.nationality?.[0]?.nationality_name,
          dateOfBirth: astronaut.date_of_birth,
          bio: astronaut.bio,
          wikiUrl: astronaut.wiki,
          imageUrl: astronaut.image?.image_url,
          inSpace: astronaut.in_space,
          timeInSpace: astronaut.time_in_space,
        }),
      )

      return {
        count: data.count,
        next: data.next,
        previous: data.previous,
        astronauts: formattedAstronauts,
      }
    } catch (err) {
      console.error('Falha no caso de uso GetAstronautsListUseCase:', err)
      throw new Error('Erro ao buscar a lista de astronautas')
    }
  }
}

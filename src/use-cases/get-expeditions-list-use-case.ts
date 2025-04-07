interface GetExpeditionsListRequest {}

interface CrewMember {
  name: string
  role: string
  agency: string
}

interface Expedition {
  name: string
  start: string // ISO date
  end: string // ISO date
  status: string
  crew: CrewMember[]
}

interface GetExpeditionsListResponse {
  expeditions: Expedition[]
}

export class GetExpeditionsListUseCase {
  async execute(
    _: GetExpeditionsListRequest,
  ): Promise<GetExpeditionsListResponse> {
    try {
      const response = await fetch(
        'https://ll.thespacedevs.com/2.3.0/expeditions/?mode=detailed',
      )

      if (!response.ok) {
        throw new Error(
          `Erro ao buscar dados da API externa: ${response.status}`,
        )
      }

      const data = await response.json()

      const formatted: Expedition[] = data.results.map((expedition: any) => ({
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

      return { expeditions: formatted }
    } catch (err) {
      console.error(err)
      throw new Error('Erro ao buscar expedições')
    }
  }
}

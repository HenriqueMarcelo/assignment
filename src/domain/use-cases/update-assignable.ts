import { Assignable } from '../entities/Assignable'
import { AssignableRepository } from '../repositories/assignable-repository'

interface UpdateAssignableUseCaseRequest {
  assignableId: string
  name: string
  tasksIds: string[]
}

interface UpdateAssignableUseCaseResponse {
  assignable: Assignable
}

export class UpdateAssignableUseCase {
  constructor(private assignableRepository: AssignableRepository) {}

  async execute({
    name,
    tasksIds,
    assignableId,
  }: UpdateAssignableUseCaseRequest): Promise<UpdateAssignableUseCaseResponse> {
    const assignable = await this.assignableRepository.findById(assignableId)

    if (!assignable) {
      throw new Error('Assignable not found.')
    }

    assignable.name = name
    assignable.tasksIds = tasksIds

    await this.assignableRepository.save(assignable)

    return { assignable }
  }
}

import { Assignable } from '../entities/Assignable'
import { AssignableRepository } from '../repositories/assignable-repository'

interface CreateAssignableUseCaseRequest {
  name: string
  tasksIds: string[]
}

interface CreateAssignableUseCaseResponse {
  assignable: Assignable
}

export class CreateAssignableUseCase {
  constructor(private assignableRepository: AssignableRepository) {}

  async execute({
    name,
    tasksIds,
  }: CreateAssignableUseCaseRequest): Promise<CreateAssignableUseCaseResponse> {
    const assignable = Assignable.create({
      name,
      tasksIds,
    })

    await this.assignableRepository.create(assignable)

    return { assignable }
  }
}

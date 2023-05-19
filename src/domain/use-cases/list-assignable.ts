import { Assignable } from '../entities/Assignable'
import { AssignableRepository } from '../repositories/assignable-repository'

interface ListAssignableUseCaseRequest {}

interface ListAssignableUseCaseResponse {
  assignables: Assignable[]
}

export class ListAssignableUseCase {
  constructor(private assignableRepository: AssignableRepository) {}

  async execute(
    _?: ListAssignableUseCaseRequest,
  ): Promise<ListAssignableUseCaseResponse> {
    const assignables = await this.assignableRepository.list()

    return { assignables }
  }
}

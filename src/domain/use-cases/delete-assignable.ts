import { AssignableRepository } from '../repositories/assignable-repository'

interface DeleteAssignableUseCaseRequest {
  assignableId: string
}

interface DeleteAssignableUseCaseResponse {}

export class DeleteAssignableUseCase {
  constructor(private assignableRepository: AssignableRepository) {}

  async execute({
    assignableId,
  }: DeleteAssignableUseCaseRequest): Promise<DeleteAssignableUseCaseResponse> {
    const assignable = await this.assignableRepository.findById(assignableId)

    if (!assignable) {
      throw new Error('Assignable not found.')
    }

    await this.assignableRepository.delete(assignable)

    return {}
  }
}

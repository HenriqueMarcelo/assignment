import { Assignment } from '../entities/Assignment'
import { AssignmentRepository } from '../repositories/assignment-repository'

interface ListAssignmentUseCaseRequest {}

interface ListAssignmentUseCaseResponse {
  assignments: Assignment[]
}

export class ListAssignmentUseCase {
  constructor(private assignmentRepository: AssignmentRepository) {}

  async execute(
    _?: ListAssignmentUseCaseRequest,
  ): Promise<ListAssignmentUseCaseResponse> {
    const assignments = await this.assignmentRepository.list()

    return { assignments }
  }
}

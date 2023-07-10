import { AssignableRepository } from '../repositories/assignable-repository'
import { AssignmentRepository } from '../repositories/assignment-repository'
import { TaskRepository } from '../repositories/task-repository'

interface GetNextAssignableByTaskUseCaseRequest {
  taskId: string
  usersNotRequested: string[]
}

interface GetNextAssignableByTaskUseCaseResponse {
  assignableIds: string[]
}

export class GetNextAssignableByTaskUseCase {
  constructor(
    private taskRepository: TaskRepository,
    private assignableRepository: AssignableRepository,
    private assignmentRepository: AssignmentRepository,
  ) {}

  async execute({
    taskId,
    usersNotRequested,
  }: GetNextAssignableByTaskUseCaseRequest): Promise<GetNextAssignableByTaskUseCaseResponse> {
    const task = await this.taskRepository.findById(taskId)

    if (!task) {
      throw new Error('Task not found.')
    }

    const allAssignablesOfTask = await this.assignableRepository.listByTask(
      taskId,
    )

    const requestedAssignablesOfTask = allAssignablesOfTask.filter(
      (assignable) => {
        return !usersNotRequested.includes(assignable.id)
      },
    )

    const unrequestedAssignablesOfTask = allAssignablesOfTask.filter(
      (assignable) => {
        return usersNotRequested.includes(assignable.id)
      },
    )

    // ----------

    const lastAssignmentOfrequestedAssignable = await Promise.all(
      requestedAssignablesOfTask.map((assignable) =>
        this.assignmentRepository.getLastAssignmentOfAssignable(assignable.id),
      ),
    )

    lastAssignmentOfrequestedAssignable.sort((a, b) => {
      let aDate = new Date(0)
      let bDate = new Date(0)

      if (a) {
        aDate = a.date
      }
      if (b) {
        bDate = b.date
      }
      return aDate.getTime() - bDate.getTime()
    })

    // ----------

    const lastAssignmentOfUnrequestedAssignable = await Promise.all(
      unrequestedAssignablesOfTask.map((assignable) =>
        this.assignmentRepository.getLastAssignmentOfAssignable(assignable.id),
      ),
    )

    lastAssignmentOfUnrequestedAssignable.sort((a, b) => {
      let aDate = new Date(0)
      let bDate = new Date(0)

      if (a) {
        aDate = a.date
      }
      if (b) {
        bDate = b.date
      }
      return aDate.getTime() - bDate.getTime()
    })

    return {
      assignableIds: [
        ...lastAssignmentOfrequestedAssignable.map((a) => a!.assignableId),
        ...lastAssignmentOfUnrequestedAssignable.map((a) => a!.assignableId),
      ],
    }
  }
}

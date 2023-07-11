import { Assignment } from '../entities/Assignment'
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

    const sortWhoMustBeTheNextOne = (a: Assignment, b: Assignment) => {
      let aDate = new Date(0)
      let bDate = new Date(0)

      if (a && a.date) {
        aDate = a.date
      }
      if (b && b.date) {
        bDate = b.date
      }

      const dateDiff = aDate.getTime() - bDate.getTime()

      if (dateDiff === 0) {
        if (a.taskId === task!.id) {
          return 1
        } else {
          return -1
        }
      }

      return dateDiff
    }

    lastAssignmentOfrequestedAssignable.sort(sortWhoMustBeTheNextOne)

    // ----------

    const lastAssignmentOfUnrequestedAssignable = await Promise.all(
      unrequestedAssignablesOfTask.map((assignable) =>
        this.assignmentRepository.getLastAssignmentOfAssignable(assignable.id),
      ),
    )

    lastAssignmentOfUnrequestedAssignable.sort(sortWhoMustBeTheNextOne)

    return {
      assignableIds: [
        ...lastAssignmentOfrequestedAssignable
          .filter((a) => !!a)
          .map((a) => a!.assignableId),
        ...lastAssignmentOfUnrequestedAssignable
          .filter((a) => !!a)
          .map((a) => a!.assignableId),
      ],
    }
  }
}

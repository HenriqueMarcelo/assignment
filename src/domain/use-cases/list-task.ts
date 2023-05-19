import { Task } from '../entities/Task'
import { TaskRepository } from '../repositories/task-repository'

interface ListTaskUseCaseRequest {}

interface ListTaskUseCaseResponse {
  tasks: Task[]
}

export class ListTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(_?: ListTaskUseCaseRequest): Promise<ListTaskUseCaseResponse> {
    const tasks = await this.taskRepository.list()

    return { tasks }
  }
}

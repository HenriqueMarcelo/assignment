import { beforeEach, expect, it } from 'vitest'
import { DeleteTaskUseCase } from '../delete-task'
import { InMemoryTaskRepository } from './in-memory-task-repository'
import { makeTask } from './make-task'

let inMemoryTaskRepository: InMemoryTaskRepository
let sut: DeleteTaskUseCase

beforeEach(() => {
  inMemoryTaskRepository = new InMemoryTaskRepository()
  sut = new DeleteTaskUseCase(inMemoryTaskRepository)
})

it('should be able to delete a task', async () => {
  const task = makeTask()
  await inMemoryTaskRepository.create(task)

  await sut.execute({
    taskId: task.id,
  })

  expect(inMemoryTaskRepository.items).toHaveLength(0)
})

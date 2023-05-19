import { beforeEach, expect, it } from 'vitest'
import { ListTaskUseCase } from '../list-task'
import { InMemoryTaskRepository } from './in-memory-task-repository'
import { makeTask } from './make-task'

let inMemoryTaskRepository: InMemoryTaskRepository
let sut: ListTaskUseCase

beforeEach(() => {
  inMemoryTaskRepository = new InMemoryTaskRepository()
  sut = new ListTaskUseCase(inMemoryTaskRepository)
})

it('should be able to list a task', async () => {
  inMemoryTaskRepository.create(makeTask())
  inMemoryTaskRepository.create(makeTask())
  inMemoryTaskRepository.create(makeTask())

  const { tasks } = await sut.execute()

  expect(tasks).toHaveLength(3)
})

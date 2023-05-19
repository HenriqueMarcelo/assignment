import { beforeAll, expect, it } from 'vitest'
import { CreateAssignmentUseCase } from '../create-assignment'
import { InMemoryAssignmentRepository } from './in-memory-assignment-repository'
import { InMemoryAssignableRepository } from './in-memory-assignable-repository'

let inMemoryAssignmentRepository: InMemoryAssignmentRepository
let sut: CreateAssignmentUseCase

beforeAll(() => {
  console.log(
    'InMemoryAssignmentRepository',
    typeof InMemoryAssignmentRepository,
  )
  console.log(
    'InMemoryAssignableRepository',
    typeof InMemoryAssignableRepository,
  )
  inMemoryAssignmentRepository = new InMemoryAssignmentRepository()
  sut = new CreateAssignmentUseCase(inMemoryAssignmentRepository)
})

it('should be able to create a assignment', () => {
  sut.execute({
    assignableId: 'assignable-1',
    taskId: 'task-1',
    date: new Date(),
  })

  expect(inMemoryAssignmentRepository.items[0].assignableId).toEqual(
    'assignable-1',
  )
})

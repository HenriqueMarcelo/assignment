import { beforeEach, expect, it } from 'vitest'
import { ListAssignmentUseCase } from '../list-assignment'
import { InMemoryAssignmentRepository } from './in-memory-assignment-repository'
import { makeAssignment } from './make-assignment'

let inMemoryAssignmentRepository: InMemoryAssignmentRepository
let sut: ListAssignmentUseCase

beforeEach(() => {
  inMemoryAssignmentRepository = new InMemoryAssignmentRepository()
  sut = new ListAssignmentUseCase(inMemoryAssignmentRepository)
})

it('should be able to list a assignment', async () => {
  inMemoryAssignmentRepository.create(makeAssignment())
  inMemoryAssignmentRepository.create(makeAssignment())
  inMemoryAssignmentRepository.create(makeAssignment())

  const { assignments } = await sut.execute()

  expect(assignments).toHaveLength(3)
})

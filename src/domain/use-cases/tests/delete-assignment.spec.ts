import { beforeEach, expect, it } from 'vitest'
import { DeleteAssignmentUseCase } from '../delete-assignment'
import { InMemoryAssignmentRepository } from './in-memory-assignment-repository'
import { makeAssignment } from './make-assignment'

let inMemoryAssignmentRepository: InMemoryAssignmentRepository
let sut: DeleteAssignmentUseCase

beforeEach(() => {
  inMemoryAssignmentRepository = new InMemoryAssignmentRepository()
  sut = new DeleteAssignmentUseCase(inMemoryAssignmentRepository)
})

it('should be able to delete a assignment', async () => {
  const assignment = makeAssignment()
  await inMemoryAssignmentRepository.create(assignment)

  await sut.execute({
    assignmentId: assignment.id,
  })

  expect(inMemoryAssignmentRepository.items).toHaveLength(0)
})

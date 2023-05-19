import { beforeEach, expect, it } from 'vitest'
import { UpdateAssignmentUseCase } from '../update-assignment'
import { InMemoryAssignmentRepository } from './in-memory-assignment-repository'
import { makeAssignment } from './make-assignment'

let inMemoryAssignmentRepository: InMemoryAssignmentRepository
let sut: UpdateAssignmentUseCase

beforeEach(() => {
  inMemoryAssignmentRepository = new InMemoryAssignmentRepository()
  sut = new UpdateAssignmentUseCase(inMemoryAssignmentRepository)
})

it('should be able to update a assignment', async () => {
  const assignment = makeAssignment()
  await inMemoryAssignmentRepository.create(assignment)

  await sut.execute({
    assignmentId: assignment.id,
    date: new Date(2022, 1, 1),
  })

  expect(inMemoryAssignmentRepository.items[0].date).toEqual(
    new Date(2022, 1, 1),
  )
})

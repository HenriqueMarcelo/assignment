import { Assignment } from '@/domain/entities/Assignment'
import { createUUID } from '@/util/create-uuid'
import { faker } from '@faker-js/faker'

export function makeAssignment() {
  return Assignment.create({
    date: faker.date.recent(),
    assignableId: createUUID(),
    taskId: createUUID(),
  })
}

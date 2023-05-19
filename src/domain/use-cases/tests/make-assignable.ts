import { Assignable } from '@/domain/entities/Assignable'
import { createUUID } from '@/util/create-uuid'
import { faker } from '@faker-js/faker'

export function makeAssignable() {
  return Assignable.create({
    name: faker.lorem.word(),
    tasksIds: [
      createUUID(),
      createUUID(),
      createUUID(),
      createUUID(),
      createUUID(),
      createUUID(),
      createUUID(),
      createUUID(),
    ],
  })
}

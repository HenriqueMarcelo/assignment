import { Task } from '@/domain/entities/Task'
import { faker } from '@faker-js/faker'

export function makeTask() {
  return Task.create({
    name: faker.lorem.word(),
  })
}

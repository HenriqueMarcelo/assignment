import { Assignment } from '@/domain/entities/Assignment'

export function getDateFromAssignment(assignment: Assignment) {
  let aDate = new Date(0)

  if (assignment && assignment.date) {
    aDate = assignment.date
  }

  return aDate
}

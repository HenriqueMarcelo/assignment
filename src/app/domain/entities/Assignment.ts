import { Entity } from './Entity'

interface AssignmentProps {
  date: Date
  taskId: string
  assignableId: string
}

export class Assignment extends Entity<AssignmentProps> {
  get date() {
    return this.props.date
  }

  set date(date) {
    this.props.date = date
  }

  get taskId() {
    return this.props.taskId
  }

  set taskId(taskId) {
    this.props.taskId = taskId
  }

  get assignableId() {
    return this.props.assignableId
  }

  set assignableId(assignableId) {
    this.props.assignableId = assignableId
  }

  static create(props: AssignmentProps, id?: string) {
    const assignment = new Assignment(props, id)

    return assignment
  }
}

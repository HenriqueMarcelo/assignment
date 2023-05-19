import { Entity } from './Entity'

interface AssignableProps {
  name: string
  tasksIds: string[]
}

export class Assignable extends Entity<AssignableProps> {
  get name() {
    return this.props.name
  }

  set name(name) {
    this.props.name = name
  }

  get tasksIds() {
    return this.props.tasksIds
  }

  set tasksIds(tasksIds) {
    this.props.tasksIds = tasksIds
  }

  static create(props: AssignableProps, id?: string) {
    const assignable = new Assignable(props, id)

    return assignable
  }
}

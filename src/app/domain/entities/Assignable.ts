import { Entity } from './Entity'

interface AssignableProps {
  name: string
  possibleTasksIds: string[]
}

export class Assignable extends Entity<AssignableProps> {
  get name() {
    return this.props.name
  }

  set name(name) {
    this.props.name = name
  }

  get possibleTasksIds() {
    return this.props.possibleTasksIds
  }

  set possibleTasksIds(possibleTasksIds) {
    this.props.possibleTasksIds = possibleTasksIds
  }

  static create(props: AssignableProps, id?: string) {
    const assignable = new Assignable(props, id)

    return assignable
  }
}

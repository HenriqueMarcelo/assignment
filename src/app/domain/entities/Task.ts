import { Entity } from './Entity'

interface TaskProps {
  name: string
}

export class Task extends Entity<TaskProps> {
  get name() {
    return this.props.name
  }

  set name(name) {
    this.props.name = name
  }

  static create(props: TaskProps, id?: string) {
    const task = new Task(props, id)

    return task
  }
}

import { createUUID } from '@/util/create-uuid'

export class Entity<Props> {
  private _id: string
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: string) {
    this.props = props
    this._id = id ?? createUUID()
  }
}

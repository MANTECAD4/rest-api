interface TodoEntityOptions {
  id: number;
  description: string;
  completedAt: Date | null;
}
export class TodoEntity {
  public id: number;
  public description: string;
  public completedAt: Date | null;

  constructor(options: TodoEntityOptions) {
    const { completedAt, description, id } = options;
    this.id = id;
    this.description = description;
    this.completedAt = completedAt;
  }
}

export class CreateTodoDto {
  public readonly completedAt: Date | null;
  private constructor(public readonly description: string) {
    this.completedAt = null;
  }

  static create(props: Record<string, any>): {
    error?: string;
    createdTodoFromDto?: CreateTodoDto;
  } {
    const { description, completedAt } = props;

    if (!description) return { error: "Description property is required" };

    return {
      createdTodoFromDto: new CreateTodoDto(description),
    };
  }
}

export class UpdateTodoDto {
  private constructor(
    public readonly description?: string | null,
    public readonly completedAt?: Date | null,
  ) {}

  get values() {
    const returnObjet: Record<string, any> = {};
    if (this.description) returnObjet.description = this.description;
    if (this.completedAt) returnObjet.completedAt = this.completedAt;
    return returnObjet;
  }

  static update(props: Record<string, any>): {
    error?: string;
    updatedTodoFromDto?: UpdateTodoDto;
  } {
    if (!props) return { error: "At least one field muts be provided." };
    const { description, completedAt } = props;

    let completedAtDateInstance = completedAt;

    if (completedAt) {
      completedAtDateInstance = new Date(completedAt);
      if (isNaN(completedAtDateInstance.getTime())) {
        return { error: "Invalid date..." };
      }
    }

    if (!completedAt && !description)
      return { error: "At least one valid field is required" };

    return {
      updatedTodoFromDto: new UpdateTodoDto(
        description,
        completedAtDateInstance,
      ),
    };
  }
}

export class CreateTodoDto {
  private constructor(public readonly description: string) {}

  get values() {
    const returnObjet: Record<string, any> = {};
    if (this.description) returnObjet.description = this.description;
    return returnObjet;
  }
  static create(props: Record<string, any>): {
    error?: string;
    createdTodoFromDto?: CreateTodoDto;
  } {
    const { description } = props;

    if (!description) return { error: "Description property is required" };

    return {
      createdTodoFromDto: new CreateTodoDto(description),
    };
  }
}

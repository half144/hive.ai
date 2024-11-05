export interface IModel {
    prompt: (prompt: string) => Promise<any>;
  }
import { FormField } from "./FormField.interface";

export interface DynamicForm{
    id: string,
    name: string,
    fields: Array<FormField>
}
import { FieldConstraint } from "./FieldConstraint.interface";
import { FieldType } from "./FieldType.type";

export interface FormField {
    id: string,
    order: number,
    label: string,
    fieldType: FieldType,
    defaultValue?: string,
    placeholder?: string,
    constraints: Array<FieldConstraint>,
    hint?: string
}
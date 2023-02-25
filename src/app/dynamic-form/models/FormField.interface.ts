import { FieldConstraint } from "./FieldConstraint.interface";
import { FieldType } from "./FieldType.type";

export interface FormField {
    id: string,
    order: number,
    label: string,
    fieldType: FieldType,
    defaultValue?: string | null,
    placeholder?: string | null,
    constraints: Array<FieldConstraint>,
    hint?: string | null
}
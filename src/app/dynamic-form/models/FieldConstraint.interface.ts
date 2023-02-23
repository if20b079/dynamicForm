import { ConstraintName } from "./ConstraintName.type";

export interface FieldConstraint {
    name: ConstraintName,
    value: string,
    hint?: string
}
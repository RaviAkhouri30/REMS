import { FormGroup } from "@angular/forms";

export interface FormIn {
    createForm(): void;
    get form(): FormGroup;
}

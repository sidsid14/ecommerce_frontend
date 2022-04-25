import { FormControl, ValidationErrors } from '@angular/forms';

export class FormValidators {
  static notOnlyWhitespace(
    control: FormControl
  ): { [key: string]: any } | null {
    if (control.value !== null && control.value.trim().length === 0) {
      return { notOnlyWhitespace: true };
    } else {
      return null;
    }
  }
}

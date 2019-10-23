import { FormGroup } from '@angular/forms';

export function confirmPassword(group: FormGroup): { [key: string]: boolean } {
  return group.controls.password.value === group.controls.confirm.value
    ? null
    : { mismatch: true };
}

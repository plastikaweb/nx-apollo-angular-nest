import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddSetGQL, SetListDocument, SetListQuery } from '@nx-apollo-angular-nest/data-access';

@Component({
  selector: 'nx-apollo-angular-nest-set-form',
  templateUrl: './set-form.component.html',
  styleUrls: ['./set-form.component.css'],
})
export class SetFormComponent {
  newSetForm: FormGroup;

  constructor(private addSetGQL: AddSetGQL, private fb: FormBuilder) {
    this.newSetForm = this.fb.group({
      name: ['', Validators.required],
      year: ['', Validators.required],
      numParts: [100, Validators.required],
    });
  }

  createSet() {
    if (this.newSetForm.valid) {
      const newSet = {
        name: this.newSetForm.get('name').value,
        year: this.newSetForm.get('year').value,
        numParts: +this.newSetForm.get('numParts').value,
      };

      this.addSetGQL.mutate(newSet);

      this.addSetGQL
        .mutate(newSet, {
          update: (store, result) => {
            const data: SetListQuery = store.readQuery({
              query: SetListDocument,
            });
            data.allSets = [...data.allSets, result.data.addSet];
            // Write our data back to the cache.
            store.writeQuery({ query: SetListDocument, data });
          },
        })
        .subscribe(() => {
          this.newSetForm.reset();
        });
    }
  }
}

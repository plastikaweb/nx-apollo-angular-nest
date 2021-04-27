import { Component } from '@angular/core';
import { Set, SetListGQL } from '@nx-apollo-angular-nest/data-access';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'nx-apollo-angular-nest-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.css'],
})
export class SetListComponent {
  sets$: Observable<Set[]>;

  constructor(private setListGQL: SetListGQL) {
    this.sets$ = this.setListGQL
      .watch()
      .valueChanges.pipe(map((result) => result.data.allSets));
  }
}

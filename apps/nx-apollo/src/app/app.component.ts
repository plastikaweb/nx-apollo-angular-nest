import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@nx-apollo-angular-nest/api-interfaces';

@Component({
  selector: 'nx-apollo-angular-nest-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
}

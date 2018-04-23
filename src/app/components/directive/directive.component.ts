import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html'
})
export class DirectiveComponent {

  courseList: string[] = ['Typescript', 'Javascript', 'JEE', 'C#', 'PHP'];
  show: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}

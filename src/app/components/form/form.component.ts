import { Component, OnInit } from '@angular/core';
import {Person} from "./person";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  person: Person = new Person();

  constructor() { }

  ngOnInit() {
  }

  save() {

  }

}

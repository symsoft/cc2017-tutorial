# The Home component
First we will create a new component, which will be the main landing page for our app.

## Create the home component

Start with creating a new folder for our components
```
cd src/app
mkdir components
cd components
```

Then generate stub code for the home component
```
ng generate component home
``` 

Next replace content in ``app.component.html`` with
```
<app-home></app-home>
``` 

Make sure the dev server is running and navigate to `localhost:4200` and verfiy that you see `home works!` 

## Show component properties with interpolation
The easiest way to display a component property is to bind the property name through interpolation. With [interpolation](https://angular.io/guide/displaying-data), 
you put the property name in the view template, enclosed in double curly braces: {{title}}.

Add a new variable `title` in `home.component.ts`
```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string;

  constructor() { }

  ngOnInit() {
    this.title = 'Welcome to Code Camp 2017';
  }

}
``` 

Bind the `title` variable using interpolation in `home.component.html`
```
<h1>
  {{title}}
</h1>
``` 

Next step [User component](./tutorial2.md)

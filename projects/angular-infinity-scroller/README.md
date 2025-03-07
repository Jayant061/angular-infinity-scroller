## Thank you for using angular -infinity-scroller for infinite scrolling.
>[!TIP]
>Note: Current version of package is compatible with angular version above 17

go to the directory, open terminal and and install package using `npm i angular-infinity-scroller`
Go to the ts file of component e.g. example.component.ts and add AngularInfinityScrollerDirective inside imports.


```ruby
import {AngularInfinityScrollerDirective} from "angular-infinity-scroller";

@Component({
  selector: 'app-example',
  imports: [
    AngularInfinityScrollerDirective,
  ],
  templateUrl: './exaple.component.html',
  styleUrl: './exaple.component.scss',
})
export class ExampleComponent{}
```
````
followed by consuming the directive in example.component.
````
### Currently Directive has 2 properties
````
scrollDistance - input which accpet a number between 1  and 10.
Describing to emit the data if scrollable height is less than or equal to (number*10) percent.
[scrollDistance]='2' value will be emitted if scrollable height is less than or 20%.

onScrolled - output that accept a voidFunction to be invoked on emit
(onScrolled)="handleScroll()"
````
```ruby
<div class='scrollable-parent' angularInfinityScroller [scrollDistance]="4" (onScrolled)="handleScroll()">
</div>
```
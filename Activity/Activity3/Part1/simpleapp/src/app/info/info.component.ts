import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  @Input() name: string = "";
  quantity = 0;
  products: string[] = [];
  selectedProduct = "Star Wars";

  constructor() { }

  ngOnInit()
  {
    this.quantity = 0;
    this.products = ["Star Wars", "The Empire Strikes Back", "Return of the Jedi"]
    this.selectedProduct = "Star Wars";
  }

  newInfo()
  {
    this.quantity = 0;
    this.products = ["Star Wars", "The Empire Strikes Back", "Return of the Jedi"];
    this.selectedProduct = this.products[0];
    console.log("In newInfo() and resetting Info");
  }

  onSubmit()
  {
    console.log("In onSubmit() with quantity of " + this.quantity + " and movie selected is " + this.selectedProduct);
  }
}

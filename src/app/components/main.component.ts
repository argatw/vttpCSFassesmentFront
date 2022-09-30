import { outputAst } from '@angular/compiler';
import { Component, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ɵassignExtraOptionsToRouter } from '@angular/router';
import { Subject } from 'rxjs';
import { Order, User } from '../models';

const SIZES: string[] = [
  "Personal - 6 inches",
  "Regular - 9 inches",
  "Large - 12 inches",
  "Extra Large - 15 inches"
]

const PizzaToppings: string[] = [
    'chicken', 'seafood', 'beef', 'vegetables',
    'cheese', 'arugula', 'pineapple'
]

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  pizzaSize = SIZES[0]

  @Output()
  onNewOrder = new Subject<Order>()

  // users: User[] = []

  regForm!: FormGroup
  // toppingsArray!: FormArray

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.regForm = this.createForm()
  }

  updateSize(size: string) {
    console.info(">>>updateSize()")
    this.pizzaSize = SIZES[parseInt(size)]
  }

  private createForm(order?: Order): FormGroup {
    // this.toppingsArray = this.createToppings(order?.toppings || [])
    return this.fb.group({
      name: this.fb.control<string>('',[Validators.required, Validators.minLength(3)]),
      email: this.fb.control<string>('',[Validators.required, Validators.email]),
      pizzaSize: this.fb.control('',[Validators.required]),
      base: this.fb.control<string>('',[Validators.required]),
      sauce: this.fb.control<string>('',[Validators.required]),
      // toppings: this.fb.control<string>('',[Validators.required]),
      // toppings: this.fb.group({}),
      // toppings: this.toppingsArray,
      toppings: new FormArray([]),
      comments: this.fb.control<string>('')
    })
  }

  processForm() {
    // const toppings= <FormGroup>this.regForm.get('toppings')
    // options.forEach((option: any) => {
    //   toppings.addControl(option.title, new FormControl(true))
    // });
    const order: Order = this.regForm.value as Order
    console.info("processForm() order:: ",order)
    this.regForm = this.createForm()
    this.onNewOrder.next(order)
  }

  // private createTopping(li?: Topping): FormGroup {
  //   return this.fb.group({
  //     chicken: this.fb.control<string>(li?.chicken || ''),
  //     seafood: this.fb.control<string>(li?.seafood || ''),
  //     beef: this.fb.control<string>(li?.beef || ''),
  //     vegetables: this.fb.control<string>(li?.vegetables || ''),
  //     extraCheese: this.fb.control<string>(li?.extraCheese || ''),
  //     arugula: this.fb.control<string>(li?.arugula || ''),
  //     pineapple: this.fb.control<string>(li?.pineapple || ''),
  //   })
  // }

  // private createToppings(lis: Topping[] = []):FormArray {
  //   return this.fb.array(lis.map(li => this.createTopping(li)))
  // }

  onCheckBoxChange(event : any) {
    const selectedToppings = this.regForm.controls['toppings'] as FormArray
    if(event.target.checked) {
      selectedToppings.push(new FormControl(event.target.value))
    } else {
      const i = selectedToppings.controls.findIndex(
        x => x.value === event.target.value);
      selectedToppings.removeAt(i)
    }
  }

}

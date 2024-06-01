import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'practice-app';
  nestedForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.nestedForm = this.fb.group({
      categories: this.fb.array([
        this.fb.group({
          categoryName: this.fb.control('', Validators.required),
          items: this.fb.array([
            this.fb.control('', Validators.required)
          ])
        })
      ])
    });
  }

  get categories() {
    return this.nestedForm.get('categories') as FormArray;
  }

  getItems(categoryIndex: number) {
    return this.categories.at(categoryIndex).get('items') as FormArray;
  }
  addCategory() {
    this.categories.push(this.fb.group({
      categoryName: this.fb.control('', Validators.required),
      items: this.fb.array([
        this.fb.control('', Validators.required)
      ])
    }));
  }
  addItem(categoryIndex: number) {
    this.getItems(categoryIndex).push(this.fb.control('', Validators.required));
  }

  removeCategory(index: number) {
    this.categories.removeAt(index);
  }
  removeItem(categoryIndex: number, itemIndex: number) {
    this.getItems(categoryIndex).removeAt(itemIndex);
  }

  onSubmit() {
    console.log(this.nestedForm.value);
  }

}

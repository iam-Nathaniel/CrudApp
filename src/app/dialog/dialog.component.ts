import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['New', 'Used', 'Refurbished'];
  productForm!: FormGroup;
  actionBtn: string = "Save";

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    //form control definitions
    this.productForm = this.fb.group({
      productName: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      freshness: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });

    //the data is being passed successfully
    console.log(this.editData.value);

    if (this.editData) {
      //if editdata is true or user clicked on edit...
      this.actionBtn = 'Update';
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  addProduct() {
    // console.log(this.productForm.value);

    if(!this.editData){
       if (this.productForm.valid) {
         this.api.postProduct(this.productForm.value).subscribe({
           next: (res) => {
             alert('product added successfully');
             this.productForm.reset();
             this.dialogRef.close('save');
           },
           error: () => {
             alert('error while adding product');
           },
         });
       }
    }
    else{
      this.updateProduct();
    }
   
  }

  updateProduct(){
    this.api.putProduct(this.productForm.value, this.editData.id).subscribe({
      next:(res)=>{
        alert('product updated successfully');
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("error while updating" + this.productForm.value)
      }
    })
  }








  closeDialog() {
    this.dialogRef.close();
  }
}



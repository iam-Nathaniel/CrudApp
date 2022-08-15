import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
 
  freshnessList = ['New', 'Used', 'Refurbished'];
  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<DialogComponent>) {}

  ngOnInit(): void {
    
    this.productForm = this.fb.group({
      productName: new FormControl('',[Validators.required]),
      category: new FormControl('',[Validators.required]),
      freshness: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required]),
      comment: new FormControl('',[Validators.required]),
      date: new FormControl('',[Validators.required]),
    })
  }

  addProduct(){
    console.log(this.productForm.value);

    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value).subscribe({
        next:(res)=>{
          alert('product added successfully');
          this.productForm.reset();
          this.dialogRef.close('saved');
          
        },
        error:()=>{
          alert('error while adding product')
        }
      })
    }
  }

}

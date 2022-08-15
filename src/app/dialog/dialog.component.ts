import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor() { }

  freshnessList = ["New", "Used", "Refurbished"];

  ngOnInit(): void {
  }

}

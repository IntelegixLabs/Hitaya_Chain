import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.scss']
})
export class NFTComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}

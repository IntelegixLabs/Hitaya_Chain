import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NftServiceService } from '../hitaya-services/nft-service/nft-service.service';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.scss']
})
export class NFTComponent implements OnInit {

  constructor(private nft_token_servie: NftServiceService, private router: Router) { }

  ngOnInit(): void {
  }

}

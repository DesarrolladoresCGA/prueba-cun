import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { ListComponent } from "../list/list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  limit = 8;

  constructor(private api: ApiService) {

  }
  ngOnInit(): void {


  }

 



}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPosgresSqlService } from '../../services/api-posgres-sql.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor (private router: Router){

  }

  ngOnInit(): void {
    
  }

  irView(vista: string){
    this.router.navigate([vista]);
  }



}

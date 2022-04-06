import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token : string;

  constructor(
    private cookie : CookieService,
  ) { 
    this.token = this.cookie.get('token');
  }

  ngOnInit(): void {
  }

}

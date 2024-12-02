import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [NavComponent]
})
export class AppComponent implements OnInit {
  title = 'Dating Application';
  private accountService = inject(AccountService);
  http = inject(HttpClient);
  users: any;

  ngOnInit(): void {
    this.getUser();
    this.setCurrentUser();
  }


  setCurrentUser(){
    const userString = localStorage.getItem('user');

    if(!userString) return;

    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  getUser(){
    this.http.get("http://localhost:5183/api/users").subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log("Reqeust has been complete")
    })
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [NavComponent]
})
export class AppComponent implements OnInit {
  title = 'Dating Application';
  http = inject(HttpClient);
  users: any;


  ngOnInit(): void {
    this.http.get("http://localhost:5183/api/users").subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log("Reqeust has been complete")
    })
  }
}

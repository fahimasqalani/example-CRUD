import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {
  // public users = [];
  users: Object;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // this.apiService.getUsers().subscribe((data)=>{
    //   console.log(this.users);
    //   this.users = Array.from(Object.keys(data), k=>data[k]);
    // });
    this.apiService.getUsers().subscribe((data)=> {
      console.log(data);
      this.users = data;
    })
  }
}

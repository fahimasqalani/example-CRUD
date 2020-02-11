import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-create',
  templateUrl: './candidate-create.component.html',
  styleUrls: ['./candidate-create.component.css']
})
export class CandidateCreateComponent implements OnInit {
  @Input() candidateDetails = { name: '', contact: '', email: '' }
  constructor(
    public api: ApiService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  addCandidate() {
    this.api.createCandidate(this.candidateDetails).subscribe((data: {}) => {
      console.log(data)
      this.router.navigate(['/list'])
    })
  }
}

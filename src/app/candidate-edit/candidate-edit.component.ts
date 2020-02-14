import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidate-edit',
  templateUrl: './candidate-edit.component.html',
  styleUrls: ['./candidate-edit.component.css']
})
export class CandidateEditComponent implements OnInit {
  id = this.route.snapshot.params['id'];
  candidateData: any = {};

  constructor(public api: ApiService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.api.getCandidate(this.id).subscribe((data: {}) => {
      this.candidateData = data;
    })
  }
  // Update candidate date using put request
  update() {
    this.api.updateCandidate(this.id, this.candidateData).subscribe(data => {
      return Swal.fire({
        icon: 'success',
        allowOutsideClick: true,
        showConfirmButton: false,
        text: 'Candidate has been updated',
        timer: 1500
      }).then(function () { location.reload(); })
    })
    this.router.navigate(['/list']);
  }
}

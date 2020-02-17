import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { error } from 'util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidate-create',
  templateUrl: './candidate-create.component.html',
  styleUrls: ['./candidate-create.component.css']
})
export class CandidateCreateComponent implements OnInit {
  // @Input() candidateDetails = { name: '', contact: '', email: '' }
  candidateForm: FormGroup;

  constructor(
    public api: ApiService,
    public router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }
  // addCandidate() {
  //   this.api.createCandidate(this.candidateDetails).subscribe((data: {}) => {
  //     console.log(data)
  //     this.router.navigate(['/list'])
  //   })
  // }

  private initForm() {
    this.candidateForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      contact: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),

    });

  }

  /*========================================
       swal before created
     =========================================*/
  addCandidate() {
    if (this.candidateForm.invalid) {
      console.log(error);
      this.api.markFormGroupTouched(this.candidateForm);
      return;
    } else {
      return Swal.fire({
        icon: 'warning',
        allowOutsideClick: true,
        showCancelButton: false,
        text: 'Confirm new candidate?',
        confirmButtonColor: '#5867dd',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.value) {
          this.api.createCandidate(this.candidateForm.value).subscribe((data: {}) => {
            this.router.navigate(['/list']);
          })
        }
      })
    }
  }


  /*========================================
       swal after created
     =========================================*/
  // addCandidate() {
  //   if (this.candidateForm.invalid) {
  //     console.log(error);
  //     this.api.markFormGroupTouched(this.candidateForm);
  //     return;
  //   } else {
  //     this.api.createCandidate(this.candidateForm.value).subscribe((data: {}) => {
  //       return swal({
  //         type: 'success',
  //         allowOutsideClick: true,
  //         showConfirmButton: false,
  //         text: 'New candidate created',
  //         timer: 1500
  //       }).then(function () { location.reload(); })
  //     })
  //     this.router.navigate(['/list']);
  //   }
  // }

}

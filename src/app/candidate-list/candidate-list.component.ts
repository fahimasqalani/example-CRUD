import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {

  Candidate: any = [];
  filteredCandidates: any = [];

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.loadCandidates()
  }

  // Get candidates list
  loadCandidates() {
    return this.api.getCandidates().subscribe((data: {}) => {
      this.Candidate = data;
    })
  }

  // Search Candidate
  search() {
    // todo
    // this.filteredCandidates = this.api.searchCandidate()
  }

  // Delete candidate
  // delete(id) {
  //   if (window.confirm('Are you sure, you want to delete?')) {
  //     this.api.deleteCandidate(id).subscribe(data => {
  //       this.loadCandidates()
  //     })
  //   }
  // }

  delete(id) {
    this.api.swalNotification('Warning', 'Are You Sure?', 'This user will be remove!!', true).then((result) => {
      if (result.value) {
        this.api.deleteCandidate(id).subscribe(data => {
          this.loadCandidates()
        })
      }
    })

  }
}


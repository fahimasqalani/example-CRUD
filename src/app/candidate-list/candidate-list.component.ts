import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Candidate } from '../candidate';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {

  candidate: any = [];
  searchById: any = [];
  loadCandidateById: number;
  filteredCandidates: Candidate[] = [];
  candidates: Candidate[] = [];
  _listFilter = '';
  token = '';


  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredCandidates = this.listFilter ? this.doFilter(this.listFilter) : this.candidates;
  }

  doFilter(filterBy: string): Candidate[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.candidates.filter((candidate: Candidate) => candidate.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  constructor(
    public api: ApiService,
    public route: ActivatedRoute,
    public router: Router,
  ) {
  this.filteredCandidates = this.candidates;
    this.listFilter = '';
  }

  ngOnInit() {
    this.loadCandidates()
  }

  // Get candidates list
  loadCandidates() {
    return this.api.getCandidates().subscribe((data) => {
      this.candidates = data;
      this.filteredCandidates = data;
    })
  }

  // Search Candidate
  search(id: number) {
    // Send Http request
    this.api.getCandidate(id).subscribe(searchResult => {
      // this.searchById = searchResult;
      // console.log(this.searchById);
      // this.router.navigate(['/list/:id']);
      this.filteredCandidates = [];
      // this.id = searchResult.id;
      // this.name = searchResult.name;
      // this.contact = searchResult.contact;
      // this.email = searchResult.email;
      this.filteredCandidates[0] = searchResult;
    })
  }

  delete(id) {
    this.api.swalNotification('Warning', 'Are You Sure?', 'This user will be remove!!', true).then((result) => {
      if (result.value) {
        this.api.deleteCandidate(id).subscribe(data => {
          this.loadCandidates()
        })
      }
    })

  }

  remove(id: number) {
    return Swal.fire({
      icon: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      text: 'Are you sure to delete this candidate!!!',
      confirmButtonColor: '#5867dd',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.value) {
        this.api.deleteCandidate(id).subscribe(data => {
          this.loadCandidates()
        })
      }
    })
  }

  onGetToken() {
    this.api.getToken().subscribe(token => {
      console.log(token);
      this.token = token['token'];
      return Swal.fire({
        title: 'Token',
        confirmButtonText: 'Ok',
        text:
          'Your token is ' +
          token['token'],
        // showLoaderOnConfirm: true,
      })
    })
  }
  onAddHeader() {
    console.log(this.token);
    this.api.addTokenToHeader(this.token).subscribe(response => {
      console.log(response);
      // alert(response['message']);
      return Swal.fire({
        title: 'Message:',
        confirmButtonText: 'Ok',
        text: response['message']
      })
    })

  }

}


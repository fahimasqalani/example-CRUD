import {Component, EventEmitter, OnInit, Output, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {User} from '../../shared/model/identity/user.interface';
import {IdentityService} from '../../../services/identity.service';
import {
  AdministrationModuleState,
  userResultDataSelector,
  userResultTotalSizeSelector
} from '../administration-reducers.module';
import {Store} from '@ngrx/store';
import {FindPagedUsersAction} from './user.action';
import {UserCreatorDialog} from './user-creator.dialog';
import {IPageChangeEvent, ITdDataTableColumn, TdDataTableService} from '@covalent/core';
import {ChangeTitleAction} from '../../shared/shared.action';

@Component({
  selector: 'cng-user-list',
  templateUrl: './user-list.page.html',
})
export class UserListPage implements OnInit {

  users$: Observable<User[]>;
  totalSize$: Observable<number>;

  searchTerm: string = '';
  rows: User[] = [];
  selectedRows: User[] = [];
  filteredRows: User[] = this.rows;


  @Output() view = new EventEmitter<User>();

  columns: any[] = [
    {name: 'name', label: 'Username'},
    {name: 'email', label: 'Email'},
    {name: 'realName', label: 'Full Name NRIC'},
    {name: 'action', label: 'Action'}
  ];

  constructor(private identityService: IdentityService,
              private snackBar: MatSnackBar,
              private router: Router,
              private dialog: MatDialog,
              private vcf: ViewContainerRef,
              private _dataTableService: TdDataTableService,
              private store: Store<AdministrationModuleState>) {
    this.users$ = this.store.select(userResultDataSelector);
    this.totalSize$ = this.store.select(userResultTotalSizeSelector);
  }

  ngOnInit(): void {
    this.store.dispatch(new ChangeTitleAction({title: 'User'}));
    this.store.dispatch(new FindPagedUsersAction({filter: 'todo', page: 1}));
    this.populateRows();
  }

  page(event: IPageChangeEvent): void {
    this.store.dispatch(new FindPagedUsersAction({filter: 'todo', page: event.page}));
  }

  viewUser(user: User): void {
    console.log(user.name);
    this.router.navigate(['/administration/users/', user.name]);
  }

  createDialog() {
    const config = new MatDialogConfig();
    config.viewContainerRef = this.vcf;
    config.role = 'dialog';
    config.width = '100%';
    config.height = '90%';
    config.position = {top: '0px'};
    const editorDialogRef = this.dialog.open(UserCreatorDialog, config);
    editorDialogRef.afterClosed().subscribe((res) => {
      // done
    });
  }

  populateRows(): void {
    this.users$.subscribe(x => {
      this.rows = x;
      this.filteredRows = this.rows;
      console.log(x);
      console.log(this.rows);

    });
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }


  filter(): void {
    let newRows: User[] = this.rows;
    newRows = this._dataTableService.filterData(newRows, this.searchTerm, true, null);
    this.filteredRows = newRows;

  }

}

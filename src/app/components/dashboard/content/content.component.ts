import { SshterminalComponent } from './sshterminal/sshterminal.component';
import { PanigatorService } from './../../../services/panigator.service';
import { ComfimeDeleteComponent } from './../comfime-delete/comfime-delete.component';
import { ServerService } from './../../../services/server.service';
import { ChangepassComponent } from './../changepass/changepass.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { InfoserverComponent } from '../infoserver/infoserver.component';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Server } from 'src/app/interface/server';
import { CustomColumn } from 'src/app/interface/customColumn';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interface/user';
import { Search } from 'src/app/interface/search';
import { saveAs } from 'file-saver';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ContentComponent implements OnInit {

  //search
  selectedValue: string = "servername";
  inputSearch: string = "";
  //export
  exportPage: boolean = true;
  exportAll: boolean = false;
  //select
  field: Search[] = [
    { value: '_id', viewValue: 'Id' },
    { value: 'servername', viewValue: 'Server Name' },
    { value: 'username', viewValue: 'User Name' },
    { value: 'ip', viewValue: 'Ip' },
    { value: 'status', viewValue: 'Status' },
    { value: 'description', viewValue: 'Description' }
  ];
  //expanded
  public columnShowHideList: CustomColumn[] = [];
  expandedElement: Server | null | undefined;
  datas: Server[] = [];
  //data table
  //displayedColumns = [{name: 'idServer'},{name: 'serverName'},{name: 'password'},{name: 'username'},{name: 'ip'},{name: 'description'},{name: 'status'},{name: 'operation'}]
  columnList: string[] = [];
  columnListName: string[] = ['Server Name', 'Password', 'Username', 'Ip', 'Status'];
  columnL = ['serverName', 'password', 'username', 'ip', 'status'];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Server>(this.datas);
  //sort
  @ViewChild(MatSort) sort!: MatSort;
  //panigator
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  limitPage: number;
  numberPage: number;
  length: number | undefined;

  handlePageEvent(event: PageEvent) {
    this.panigator.limitPage = event.pageSize;
    this.panigator.numberPage = event.pageIndex;
    this.getServer(this.panigator.limitPage, this.panigator.numberPage + 1);
    this.length = this.panigator.length;
  }

  constructor(public dialog: MatDialog, private toastr: ToastrService, private panigator: PanigatorService, private router: Router, private serverService: ServerService, private errToastr: ErrorToastrService) {
    this.limitPage = panigator.limitPage;
    this.numberPage = panigator.numberPage;
  }

  ngOnInit(): void {
    this.initializeColumnProperties();
    this.getList();
  }
  getList() {
    this.datas = [];
    this.getServer(this.panigator.limitPage, this.panigator.numberPage + 1);
    this.length = this.panigator.length;
    this.displayedColumns = this.panigator.displayedColumns;
    this.columnList = this.panigator.columnList;
  }

  getServer(limit: number, num: number) {
    this.datas = [];
    this.serverService.getAll(limit, num).subscribe((res: any) => {
      for (var key in res.data) {
        this.datas.push(res.data[key])
      }
      this.panigator.length = res.totalServer;
      this.length = this.panigator.length;
      this.dataSource = new MatTableDataSource<Server>(this.datas);
      this.dataSource.sort = this.sort;
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      }
    )
  }

  details(element: any) {
    this.router.navigate(['/dashboard/detailstatus', element.idServer])
  }

  openEdit(element: any): void {
    const dialogRef = this.dialog.open(InfoserverComponent, {
      width: '500px',
      data: { idServer: element.idServer, serverName: element.serverName, username: element.username, password: element.password, ip: element.ip, description: element.description }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getList();
      }, 2000);
    });
  }

  changePass(element: any): void {
    const dialogRef = this.dialog.open(ChangepassComponent, {
      width: '500px',
      data: { idServer: element.idServer, servername: element.servername, password: element.password, ip: element.ip, description: element.description }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getList();
      }, 2000);
    });
  }

  removeData(element: any) {
    const dialogRef = this.dialog.open(ComfimeDeleteComponent, {
      width: '350px',
      data: { idServer: element.idServer }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getList();
      }, 2000);
    });
  }

  exportPageX() {
    this.serverService.export(this.exportPage, this.limitPage, this.numberPage + 1).subscribe((res: any) => {
      window.location.assign(window.location.protocol + "//" +res.url);
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      }
    )
  }
  
  exportAllX() {
    this.serverService.export(this.exportAll, this.limitPage, this.numberPage + 1).subscribe((res: any) => {
      window.location.assign(window.location.protocol + "//" +res.url);
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      }
    )
  }

  disconnect(element: any) {
    console.log(element)
    if (element.status == "Off" || element.status == "Invalid") {
      this.toastr.warning("Can't Disconnect");
    }
    else {
      this.serverService.disconnect(element.idServer).subscribe((res: any) => {
        if (res.mess == "Done") {
          this.toastr.success("Disconnect Success");
          setTimeout(() => {
            this.getList();
          }, 2000);
        }
      },
      (err: any) => {
        this.errToastr.errToastr(err);
      })
    }
  }

  connect(element: any) {
    const dialogRef = this.dialog.open(SshterminalComponent, {
      width: '1000px',
      height: '700px'
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(()=>{
        
      },1000)
    });
    if (element.status == "On") {
      this.toastr.warning("Connected");
    }
    else {
      const con = <User>{
        // username: element.username,
        // password: element.password,
      }
      this.serverService.connect(con).subscribe((res: any) => {
        if (res.mess == "Done") {
          this.toastr.success("Connect Success");
          setTimeout(() => {
            this.getList();
          }, 2000);
        }
      },
      (err: any) => {
        this.errToastr.errToastr(err);
      })
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue == "") {
      this.getList();
    } else {
      this.datas = [];
      this.serverService.searchField(filterValue, this.selectedValue, this.panigator.limitPage, this.panigator.numberPage + 1).subscribe((res: any) => {
        for (var key in res.data) {
          this.datas.push(res.data[key])
        }
        this.panigator.length = res.totalServer;
        this.length = this.panigator.length;
        this.dataSource = new MatTableDataSource<Server>(this.datas);
        this.dataSource.sort = this.sort;
      })
    }
  }
  change(change: any) {
    if (this.inputSearch == "") {
      this.getServer(this.panigator.limitPage, this.panigator.numberPage + 1);
      this.length = this.panigator.length;
    } else {
      this.datas = [];
      this.serverService.searchField(this.inputSearch, change.value, this.panigator.limitPage, this.panigator.numberPage + 1).subscribe((res: any) => {
        for (var key in res.data) {
          this.datas.push(res.data[key])
        }
        this.panigator.length = res.totalServer;
        this.length = this.panigator.length;
        this.dataSource = new MatTableDataSource<Server>(this.datas);
        this.dataSource.sort = this.sort;
      },
        (err: any) => {
          this.errToastr.errToastr(err);
        }
      )

    }
  }

  //togger
  toggleColumn(column: { isActive: any; possition: number; name: string; }) {
    if (column.isActive) {
      if (column.possition > this.panigator.columnList.length - 1) {
        this.panigator.columnList.push(column.name);
      } else {
        this.panigator.columnList.splice(column.possition, 0, column.name);
      }
    } else {
      let i = this.panigator.columnList.indexOf(column.name);
      let opr = i > -1 ? this.panigator.columnList.splice(i, 1) : undefined;
    }
    this.panigator.displayedColumns = ['idServer', ...this.columnList, 'operation'];
    this.displayedColumns = this.panigator.displayedColumns;
  }
  active: boolean | undefined;
  initializeColumnProperties() {
    this.columnL.forEach((element, index) => {
      if (this.panigator.columnList.indexOf(element) > -1) {
        this.active = true;
      } else {
        this.active = false;
      }
      this.columnShowHideList.push(
        { possition: index, name: element, isActive: this.active, nameCol: this.columnListName[index] }
      );
    });
  }
}

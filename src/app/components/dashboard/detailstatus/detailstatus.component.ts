import { Status } from './../../../interface/status';
import { DetailStatusService } from './../../../services/detail-status.service';
import { Component, Inject, Input, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaskedDateTimeService } from '@syncfusion/ej2-angular-calendars';
import { ToastrService } from 'ngx-toastr';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';
@Component({
  selector: 'app-detailstatus',
  templateUrl: './detailstatus.component.html',
  styleUrls: ['./detailstatus.component.css'],
  providers: [MaskedDateTimeService],
  encapsulation: ViewEncapsulation.None
})
export class DetailstatusComponent implements OnInit {
  public format: string = "M/d/yyyy hh:mm a";
  public enableMaskSupport: boolean = true;
  public today: Date = new Date();
  dateStart: Date = new Date();
  minDateStart: Date = new Date();
  maxDateStart: Date = new Date();
  dateEnd: Date = new Date();
  minDateEnd: Date = new Date();
  maxDateEnd: Date = new Date();
  statusServer: string | undefined;
  listStatus: Status[] = [];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  id: any;
  constructor(private fb: FormBuilder, private errToastr: ErrorToastrService, private route: ActivatedRoute, private toastr: ToastrService, private detailStatus: DetailStatusService, private router: Router) {
    this.form = this.fb.group({
      id: ['', Validators.required],
    })
  }

  hide = false;
  form: FormGroup;
  ngOnInit() {
    this.getListStatus();
  }
  getListStatus() {
    this.listStatus = [];
    const idView = this.route.snapshot.paramMap.get('id');
    if (idView) {
      this.detailStatus.getDetailStatus(idView).subscribe((res: any) => {
        this.listStatus = [];
        this.id = idView;
        this.hide = true;
        for (var key in res.status) {
          this.listStatus.push(res.status[key])
        }
        this.dateStart = new Date(this.listStatus[0].time);
        this.dateEnd = new Date(this.listStatus[this.listStatus.length - 1].time)
        this.minDateStart = new Date(this.listStatus[0].time);
        this.maxDateStart = this.dateEnd
        this.minDateEnd = this.dateStart
        this.maxDateStart = new Date(this.listStatus[this.listStatus.length - 1].time)
        this.statusServer = res.statusServer
      },
        (err: any) => {
          this.errToastr.errToastr(err);
        }
      )
    }
  }
  getListStatusAfter(start: any, end: any) {
    this.listStatus = [];
    const idView = this.route.snapshot.paramMap.get('id');
    if (idView) {
      this.detailStatus.getDetail(idView, start, end).subscribe((res: any) => {
        this.listStatus = [];
        this.id = idView;
        this.hide = true;
        for (var key in res.status) {
          this.listStatus.push(res.status[key])
        }
        this.dateStart = new Date(this.listStatus[0].time);
        this.dateEnd = new Date(this.listStatus[this.listStatus.length - 1].time)
        this.statusServer = res.statusServer
      },
        (err: any) => {
          this.errToastr.errToastr(err);
        }
      )
    }
  }
  detail() {
    this.id = this.form.value.id;
    this.detailStatus.getDetailStatus(this.id).subscribe((res: any) => {
      this.router.navigate(['/dashboard/detailstatus', this.id])
      this.listStatus = [];
      for (var key in res.status) {
        this.listStatus.push(res.status[key])
      }
      this.hide = true;
      this.dateStart = new Date(this.listStatus[0].time);
      this.dateEnd = new Date(this.listStatus[this.listStatus.length - 1].time)
      this.minDateStart = new Date(this.listStatus[0].time);
      this.maxDateStart = this.dateEnd
      this.minDateEnd = this.dateStart
      this.maxDateStart = new Date(this.listStatus[this.listStatus.length - 1].time)
      this.statusServer = res.statusServer
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      })

  }



  public onChangeStart(args: any): void {
    this.minDateEnd = args;
    this.getListStatusAfter(this.dateStart, this.dateEnd);
  }
  public onChangeEnd(args: any): void {
    this.maxDateStart = args;
    this.getListStatusAfter(this.dateStart, this.dateEnd);
  }



}

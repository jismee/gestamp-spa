import { Component, ViewChild, HostListener } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { Sale } from '../../_models/sale';

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.css']
})
export class MemberAddComponent {

  @ViewChild('addForm', {static: false}) addForm: NgForm;

  sale: Sale;
  
  @HostListener('window:beforeunload', ['$event'])
  unloadMotification($event: any) {
    if (this.addForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute,
              private alertify: AlertifyService,
              private userService: UserService,
              private authService: AuthService) { }


  addSale(f: NgForm) {

    this.sale = f.value;
    
    this.userService.addSale(this.authService.decodedToken.nameid, this.sale).subscribe(next => {
      this.alertify.success('Sale added successfully');
      this.addForm.reset(this.sale);
    }, error => {
      this.alertify.error(error);
    });
  }



}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  // viene el usuario de la lista de miembros
  @Input() sale: any; //User;
  @Output() removedSale = new EventEmitter();

  constructor(private authService: AuthService,
              private userService: UserService,
              private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
  }

  removeSale(id: number) {
    this.userService.removeSale(this.authService.decodedToken.nameid, id).subscribe(next => {
      this.alertify.success('Sale removed successfully');
      this.removedSale.emit(id);
    }, error => {
      this.alertify.error(error);
    });
  }
}

import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  // para acceder a los datos del form
  @ViewChild('editForm', {static: false}) editForm: NgForm;
  sale: any; //User;
  photoUrl: string;
  // esto es para avisar si se cierra el navegador
  // y hay datos que no estan salvados
  @HostListener('window:beforeunload', ['$event'])
  unloadMotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute,
              private alertify: AlertifyService,
              private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.sale = data['sale'];
    });
  }
  updateSale() {

    // name id corresponde con el id del usuario decodificado del toke n
    //const nameid = this.authService.getId().nameid;
    this.userService.updateSale(this.authService.decodedToken.nameid, this.sale.id, this.sale).subscribe(next => {
      this.alertify.success('Sale updated successfully');
      // esto hace que el form quede como no tocado
      // si lo dejamos vacio queda vacio
      // si ponemos this.user, deja los datos actuliados
      this.editForm.reset(this.sale);
    }, error => {
      this.alertify.error(error);
    });
   
  }



}

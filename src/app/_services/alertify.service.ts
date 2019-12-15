import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  confirm(mesage: string, okCallback: () => any) {
    alertify.confirm(mesage, function(e) {
      if (e) {
        okCallback();
      } else {}
    });
  }

  success(mesage: string) {
    alertify.success(mesage);
  }

  error(mesage: string) {
    alertify.error(mesage);
  }

  warning(mesage: string) {
    alertify.warning(mesage);
  }

  message(mesage: string) {
    alertify.message(mesage);
  }

}

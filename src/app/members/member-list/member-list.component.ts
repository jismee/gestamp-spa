import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  sales: any[]; // User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  userParams: any = {};
  pagination: Pagination;

  constructor(private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.sales = data['sales'].result;
      this.pagination = data['sales'].pagination;
    });

    this.userParams.orderBy = 'created';
    this.userParams.search = '';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadSales();
  }

  resetFilters() {
    this.userParams.search = '';

    this.loadSales();
  }

  applyFilters() {
    this.loadSales();
  }

  loadSales() {
    this.userService.getSales(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<User[]>) => {
        this.sales = res.result;
        this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  removedSale(id: number) {
    this.sales = this.sales.filter(sale => sale.id !== id);
    this.pagination.totalItems -= this.pagination.totalItems;
  }
}

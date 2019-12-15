import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { MemberAddComponent } from './members/member-add/member-add.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
     {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'addsale', component: MemberAddComponent},
            { path: 'members', component: MemberListComponent,
                resolve: {sales: MemberListResolver}},
            { path: 'member/:id', component: MemberEditComponent,
                resolve: {sale: MemberEditResolver},
                canDeactivate: [PreventUnsavedChanges]}
        ]
    },

    { path: '**', redirectTo: '', pathMatch: 'full' },
];


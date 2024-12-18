import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HighchartsChartModule } from 'highcharts-angular';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DownloadListComponent } from './download-list/download-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { RequestListComponent } from './request-list/request-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { ManageRecipeComponent } from './manage-recipe/manage-recipe.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    DashboardComponent,
    DownloadListComponent,
    UsersListComponent,
    RequestListComponent,
    RecipeListComponent,
    ManageRecipeComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SearchPipe,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HighchartsChartModule
  ]
})
export class AdminModule { }
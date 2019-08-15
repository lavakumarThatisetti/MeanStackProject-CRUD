import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';

import {IssueService} from './issue.service';

import {MatButtonModule,MatDividerModule,MatTableModule} from '@angular/material';
//import { MaterialModule } from '@angular/material';

import{MatToolbarModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatOptionModule,MatIconModule,MatCardModule,MatSnackBarModule} from '@angular/material';

const routes:Routes=[
  {path:'create',component:CreateComponent},
  {path:'edit/:id',component:EditComponent},
  {path:'list',component:ListComponent},
  {path:'',redirectTo:'/list',pathMatch:'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatTableModule,
    MatDividerModule
  ],
  providers: [IssueService],
  bootstrap: [AppComponent]
})
export class AppModule { }

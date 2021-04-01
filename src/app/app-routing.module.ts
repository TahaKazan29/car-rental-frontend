import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { BrandEditComponent } from './components/brand/brand-edit/brand-edit.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { CarEditComponent } from './components/car/car-edit/car-edit.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { ColorEditComponent } from './components/color/color-edit/color-edit.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HireComponent } from './components/hire/hire.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const appRoutes: Routes = [
  {path:"",redirectTo:"/home",pathMatch:"full"},
  {path:"home",component:HomeComponent},
  {path:"brands",component:BrandComponent},
  {path:"colors",component:ColorComponent},
  {path:"cars",component:CarComponent},
  {path:"customers",component:CustomerComponent},
  {path:"rentals",component:RentalComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/brand/:brandId/edit",component:BrandEditComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/:carId/detail",component:CarDetailComponent},
  {path:"cars/:carId/edit",component:CarEditComponent},
  {path:"cars/:carId/hire",component:HireComponent,canActivate:[LoginGuard]},
  {path:"cars/add",component:CarAddComponent},
  {path:"brands/add",component:BrandAddComponent},
  {path:"colors/add",component:ColorAddComponent},
  {path:"colors/:colorId/edit",component:ColorEditComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"profileEdit",component:ProfileEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

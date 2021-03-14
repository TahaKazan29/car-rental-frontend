import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';

const appRoutes: Routes = [
  {path:"",component:CarComponent,pathMatch:"full"},
  {path:"brand",component:BrandComponent},
  {path:"color",component:ColorComponent},
  {path:"car",component:CarComponent},
  {path:"customer",component:CustomerComponent},
  {path:"rental",component:RentalComponent},
  {path:"car/brand/:brandId",component:CarComponent},
  {path:"car/color/:colorId",component:CarComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

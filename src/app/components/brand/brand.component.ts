import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { AuthService } from 'src/app/services/auth.service';
import { BrandService } from 'src/app/services/brand.service';
import { ClaimControlService } from 'src/app/services/claim-control.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[] = [];
  filterText = "";
  constructor(private brandService:BrandService,
    public toastrService:ToastrService,
    public claimControlService:ClaimControlService,
    ) { }

  ngOnInit(): void {
   this.getBrands();
  }

  getBrands()
  {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  deleteBrand(brand:Brand){
    this.brandService.delete(brand).subscribe(res => {
      this.getBrands();
      this.toastrService.info(res.message,"Başarılı");
    })
  }

}

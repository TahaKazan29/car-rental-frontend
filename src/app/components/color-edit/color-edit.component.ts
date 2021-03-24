import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-color-edit',
  templateUrl: './color-edit.component.html',
  styleUrls: ['./color-edit.component.css']
})
export class ColorEditComponent implements OnInit {

  color:Color;

  constructor(
    private colorService:ColorService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getColorById(params["colorId"]);
    });
  }


  getColorById(colorId:number)
  {
    this.colorService.getColor(colorId).subscribe(data=>{
      this.color = data.data;
    })
  }


  update(){
    this.colorService.update(this.color).subscribe(response => {
      this.toastrService.success("Güncelleme Başarılı","Başarılı");
    },responseError => {
      if (responseError.error.Errors.length > 0) {
              for(let i = 0; i < responseError.error.Errors.length; i++)
              {
                this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
              }
            }
    })
  }

}

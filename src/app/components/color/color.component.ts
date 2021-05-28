import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ClaimControlService } from 'src/app/services/claim-control.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors:Color[] = [];
  filterText = "";

  constructor(private colorService:ColorService,
    private toastrService:ToastrService,
    public claimControlService:ClaimControlService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors()
  {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  deleteColor(color:Color){
    this.colorService.delete(color).subscribe(res => {
      this.getColors();
      this.toastrService.info(res.message,"Başarılı");
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { AuthService } from 'src/app/services/auth.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors:Color[] = [];
  filterText = "";

  constructor(private colorService:ColorService,public authService:AuthService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors()
  {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

}

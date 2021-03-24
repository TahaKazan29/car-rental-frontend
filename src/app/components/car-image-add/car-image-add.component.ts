import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FileUploader,FileItem } from 'ng2-file-upload';
import {ActivatedRoute} from '@angular/router';
import { CarImages } from 'src/app/models/carImages';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-image-add',
  templateUrl: './car-image-add.component.html',
  styleUrls: ['./car-image-add.component.css']
})
export class CarImageAddComponent implements OnInit,OnChanges {

  carImages:CarImages[] = [];
  uploader:FileUploader;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false
  baseUrl = "https://localhost:44318/api/";
  currentMain:CarImages;
  @Input() carId:number;

  constructor(private ActivatedRoute:ActivatedRoute,private toastrService:ToastrService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.initializeUploader(this.carId);
  }

  ngOnInit(): void {

  }


  initializeUploader(carId:number){
    this.uploader = new FileUploader({
      url:this.baseUrl + "carImages/add",
      isHTML5:true,
      allowedFileType:['image'],
      autoUpload:false,
      itemAlias:'ImagePath',
      additionalParameter:{
        carId:this.carId
      },
      removeAfterUpload:true,
      maxFileSize:10*1024*1024
    });
    this.uploader.onAfterAddingFile = (file) =>{
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item:FileItem, response:string, status: number, headers: any) => {
      this.toastrService.success("Resim Eklendi","Başarılı");
    };
  }
}



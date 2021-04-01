import { CarImages } from "./carImages";

export class CarDetail {
  id:number;
  brandName:string;
  colorName:string;
  dailyPrice:number;
  modelYear:string;
  description:string;
  imagePath:string;
  carImages:CarImages[];
  findeksValue:number;
}

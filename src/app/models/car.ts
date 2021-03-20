import { CarImages } from "./carImages";

export class Car {
  id:number;
  brandName:string;
  colorName:string;
  dailyPrice:number;
  modelYear:string;
  description:string;
  imagePath:string;
  carImages:CarImages[];
}

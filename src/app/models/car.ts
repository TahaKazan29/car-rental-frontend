import { CarImages } from "./carImages";

export interface Car {
  id:number;
  brandName:string;
  colorName:string;
  dailyPrice:number;
  modelYear:string;
  description:string;
  imagePath:string;
  carImages:CarImages[];
}

import React from "react";
import var1 from "../../../assets/1.png";
import var2 from "../../../assets/2.png";
import var3 from "../../../assets/3.png";
import var4 from "../../../assets/4.png";
import var5 from "../../../assets/5.png";
import { Image, ImageContainer } from "./styled";

export default function VariantImage({ variant }: { variant: number }) {
  let srcImg;
  switch (variant) {
    case 1:
      srcImg = var1;
      break;
    case 2:
      srcImg = var2;
      break;
    case 3:
      srcImg = var3;
      break;
    case 4:
      srcImg = var4;
      break;
    case 5:
      srcImg = var5;
      break;
  }
  return (
    <ImageContainer>
      <Image src={srcImg} alt="neural network" />
    </ImageContainer>
  );
}

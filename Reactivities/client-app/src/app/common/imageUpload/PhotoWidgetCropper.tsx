import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useRef } from "react";

interface Props {
  imagePreview: string;
  setCropper: (cropper: Cropper) => void;
}

export default function PhotoWidgetCropper({imagePreview, setCropper}: Props) {
  const cropperRef = useRef<ReactCropperElement>(null);
  return (
    <Cropper
    src = {imagePreview}
    style ={{height:200, width: '100%'}}
    initialAspectRatio = {1}
    aspectRatio = {1}
    preview = '.img-preview'
    guides = {false}
    autoCropArea = {1}
    background = {false}
    onInitialized = {(cropper: any) => setCropper(cropper)}

    />
 


  )
}
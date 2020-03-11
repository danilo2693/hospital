import { Component, OnInit } from '@angular/core';
import { UploadImageService } from '../services/upload-image.service';

@Component({
  selector: 'app-modal-upload-image',
  templateUrl: './modal-upload-image.component.html',
  styles: []
})
export class ModalUploadImageComponent implements OnInit {
  constructor(public uploadImageService: UploadImageService) {}

  ngOnInit() {}
}

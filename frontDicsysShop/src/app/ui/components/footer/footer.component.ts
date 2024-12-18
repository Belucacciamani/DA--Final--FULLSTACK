import { Component } from '@angular/core';
import { GlobalText } from '../../../data/text';
@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  constructor(public globalText: GlobalText) {}
}

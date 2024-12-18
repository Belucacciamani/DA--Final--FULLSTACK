import { Component } from '@angular/core';
import { GlobalText } from '../../../data/text';
import { UrlNavigateService } from '../../../services/url-navigate.service';
import { Globalurl } from '../../../data/url';


@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    public globaltext: GlobalText,
    public urlNavigateService: UrlNavigateService,
    public globalurl: Globalurl
  ) {}

  browseHome() {
    this.urlNavigateService.browseUrl(this.globalurl.home);
  }

  browseProducts() {
    this.urlNavigateService.browseUrl(this.globalurl.products);
  }

  browserCategories() {
    this.urlNavigateService.browseUrl(this.globalurl.categories);
  }
}

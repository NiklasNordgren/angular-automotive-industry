import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, ChangeDetectorRef, HostListener } from '@angular/core';
import { MediaService } from './service/media.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: any; }; }) {
    this.changeDetectorRef.detectChanges();
  }
  @HostBinding('class') componentCssClass = 'dark-theme';
  darkThemeActive: boolean = false;
  isBelowMd: boolean = false;

  constructor(
    private overlayContainer: OverlayContainer,
    private changeDetectorRef: ChangeDetectorRef,
    private mediaService: MediaService
  ) {
    this.mediaService.isBelowMd().subscribe(x => {
      this.isBelowMd = x.matches;
    });
    this.toggleTheme();
  }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  toggleTheme(): void {
    this.darkThemeActive = !this.darkThemeActive;
    let theme: string = this.darkThemeActive ? 'dark-theme' : 'light-theme';
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }
}


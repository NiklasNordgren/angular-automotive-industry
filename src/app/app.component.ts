import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, ChangeDetectorRef, HostListener } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

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
  mobileQuery: MediaQueryList;
  private _mobileQueryListener(): void { }

  constructor(
    private overlayContainer: OverlayContainer,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {
    this.toggleTheme();
    this.mobileQuery = this.media.matchMedia('(max-width: 819px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
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


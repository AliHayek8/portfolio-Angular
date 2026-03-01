import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app';
import { RouterTestingModule } from '@angular/router/testing';
import { AppBarModule } from '@progress/kendo-angular-navigation';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule, AppBarModule, ButtonsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have router outlet', () => {
    const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have hero section', () => {
    const heroSection = fixture.nativeElement.querySelector('.hero-section');
    expect(heroSection).toBeTruthy();
  });

  it('should display main heading', () => {
    const heading = fixture.nativeElement.querySelector('h1');
    expect(heading).toBeTruthy();
    expect(heading.textContent).toContain('Welcome');
  });

  it('should have features section', () => {
    const featuresSection = fixture.nativeElement.querySelector('.features-section');
    expect(featuresSection).toBeTruthy();
  });

  it('should have call to action buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});

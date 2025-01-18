import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: any;
  let authServiceMock: any;
  let userServiceMock: any;

  beforeEach(async(() => {
    authServiceMock = {
      logout: jasmine.createSpy('logout')
    };

    userServiceMock = {
      getCurrentUserEmail: jasmine.createSpy('getCurrentUserEmail').and.returnValue('test@example.com')
    };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get the current user email on init', () => {
    component.ngOnInit();
    expect(userServiceMock.getCurrentUserEmail).toHaveBeenCalled();
    expect(component.email).toBe('test@example.com');
  });

  it('should call logout on logout', () => {
    component.logout();
    expect(authServiceMock.logout).toHaveBeenCalled();
  });

  it('should display the email if user is logged in', () => {
    component.email = 'test@example.com';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('connecté(e) en tant que : test@example.com');
  });

  it('should display the logo', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('img').src).toContain('assets/image/logo.png');
  });
});

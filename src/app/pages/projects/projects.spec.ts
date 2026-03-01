import { TestBed } from '@angular/core/testing';
import { ProjectService } from '../../core/services/project';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProjectsComponent Integration', () => {
  let projectService: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    });

    projectService = TestBed.inject(ProjectService);
  });

  it('should create ProjectService', () => {
    expect(projectService).toBeTruthy();
  });

  it('should have getProjects method', () => {
    expect(projectService.getProjects).toBeDefined();
  });

  it('should have getProjectById method', () => {
    expect(projectService.getProjectById).toBeDefined();
  });

  it('should have addProject method', () => {
    expect(projectService.addProject).toBeDefined();
  });

  it('should have updateProject method', () => {
    expect(projectService.updateProject).toBeDefined();
  });

  it('should have deleteProject method', () => {
    expect(projectService.deleteProject).toBeDefined();
  });
});

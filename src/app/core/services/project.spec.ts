import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProjectService } from './project';
import { Project } from '../models/project.model';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    });

    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all projects', () => {
    const mockProjects: Project[] = [
      { id: 1, title: 'Project 1', description: 'Description 1' },
      { id: 2, title: 'Project 2', description: 'Description 2' }
    ];

    service.getProjects().subscribe((projects) => {
      expect(projects.length).toBe(2);
      expect(projects).toEqual(mockProjects);
    });

    const req = httpMock.expectOne('/api/projects');
    expect(req.request.method).toBe('GET');
    req.flush(mockProjects);
  });

  it('should fetch a project by ID', () => {
    const mockProject: Project = { id: 1, title: 'Project 1', description: 'Description 1' };

    service.getProjectById(1).subscribe((project) => {
      expect(project).toEqual(mockProject);
    });

    const req = httpMock.expectOne('/api/projects/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProject);
  });

  it('should add a new project', () => {
    const newProject: Project = { id: 3, title: 'New Project', description: 'New Description' };

    service.addProject(newProject).subscribe((project) => {
      expect(project).toEqual(newProject);
    });

    const req = httpMock.expectOne('/api/projects');
    expect(req.request.method).toBe('POST');
    req.flush(newProject);
  });

  it('should update a project', () => {
    const updatedProject: Project = { id: 1, title: 'Updated Project', description: 'Updated Description' };

    service.updateProject(1, updatedProject).subscribe((project) => {
      expect(project).toEqual(updatedProject);
    });

    const req = httpMock.expectOne('/api/projects/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedProject);
  });

  it('should delete a project', () => {
    service.deleteProject(1).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('/api/projects/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'Project deleted' });
  });
});

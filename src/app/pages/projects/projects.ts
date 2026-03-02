import { Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { GridModule } from '@progress/kendo-angular-grid';
import { ProjectService } from '../../core/services/project';
import { Project } from '../../core/models/project.model';

@Component({
  standalone: true,
  selector: 'app-projects',
  imports: [AsyncPipe, NgFor, NgIf, GridModule],
  templateUrl: './projects.html'
  ,
  styleUrl: './projects.scss'
})
export class ProjectsComponent {
  projects$: Observable<Project[]>;

  constructor(private projectService: ProjectService) {
    this.projects$ = this.projectService.getProjects();
  }
}

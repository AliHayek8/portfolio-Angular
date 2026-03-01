import { Component, OnInit } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/project';
import { Project } from '../../core/models/project.model';

@Component({
  standalone: true,
  selector: 'app-projects',
  imports: [GridModule, CommonModule],
  template: `
    <div class="projects-container">
      <div class="projects-header">
        <h1>My Projects</h1>
        <p class="subtitle">A collection of projects I've worked on</p>
      </div>

      <div class="projects-content">
        <div *ngIf="isLoading" class="loading-state">
          <p>Loading projects...</p>
        </div>

        <div *ngIf="error" class="error-state">
          <p>{{ error }}</p>
        </div>

        <div *ngIf="!isLoading && !error && projects.length > 0">
          <div class="grid-wrapper">
            <kendo-grid [data]="projects" [height]="500" class="projects-grid">
              <kendo-grid-column field="id" title="Project ID" [width]="100"></kendo-grid-column>
              <kendo-grid-column field="title" title="Project Name" [width]="200"></kendo-grid-column>
              <kendo-grid-column field="description" title="Description"></kendo-grid-column>
            </kendo-grid>
          </div>

          <div class="projects-list">
            <h2>Latest Projects</h2>
            <div class="projects-cards">
              <div class="project-card" *ngFor="let project of projects">
                <div class="project-header">
                  <h3>{{ project.title }}</h3>
                  <span class="project-id">#{{ project.id }}</span>
                </div>
                <p class="project-description">{{ project.description }}</p>
                <div class="project-footer">
                  <button class="btn-small">View Details</button>
                  <button class="btn-small btn-secondary">Visit Site</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div *ngIf="!isLoading && !error && projects.length === 0" class="empty-state">
          <p>No projects found.</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./projects.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.error = null;
    this.projectService.getProjects().subscribe({
      next: (data: Project[]) => {
        this.projects = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load projects. Please try again later.';
        this.isLoading = false;
        console.error('Error loading projects:', err);
      }
    });
  }
}

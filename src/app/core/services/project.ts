import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = '/api/projects';

  constructor(private http: HttpClient) { }

  /**
   * Get all projects
   * @returns Observable<Project[]>
   */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  /**
   * Get a specific project by ID
   * @param id - Project ID
   * @returns Observable<Project>
   */
  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new project
   * @param project - Project data
   * @returns Observable<Project>
   */
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  /**
   * Update an existing project
   * @param id - Project ID
   * @param project - Updated project data
   * @returns Observable<Project>
   */
  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project);
  }

  /**
   * Delete a project
   * @param id - Project ID
   * @returns Observable<any>
   */
  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Project } from '../models/project.model';

@Injectable()
export class MockHttpInterceptor implements HttpInterceptor {

  private projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce application built with Angular 21, Node.js, and MongoDB. Features include product catalog, shopping cart, payment integration, and admin dashboard.'
    },
    {
      id: 2,
      title: 'Machine Learning Image Classifier',
      description: 'Stone classification ML model using TensorFlow and Python. Achieved 95% accuracy with CNN architecture. Deployed as REST API.'
    },
    {
      id: 3,
      title: 'Real-time Chat Application',
      description: 'WebSocket-based chat application with Angular frontend and Node.js backend. Supports group chats, file sharing, and user authentication.'
    },
    {
      id: 4,
      title: 'Data Analytics Dashboard',
      description: 'Interactive dashboard built with Angular and Kendo UI. Displays real-time data visualization using Chart.js and D3.js.'
    },
    {
      id: 5,
      title: 'Task Management System',
      description: 'Collaborative task management tool with drag-and-drop functionality, real-time notifications, and team collaboration features.'
    },
    {
      id: 6,
      title: 'Weather Forecast App',
      description: 'Weather application with real-time data from OpenWeatherMap API. Features include location search, 7-day forecast, and weather alerts.'
    },
    {
      id: 7,
      title: 'Social Media Platform',
      description: 'Social networking platform with user profiles, posts, comments, likes, and real-time notifications using Firebase.'
    },
    {
      id: 8,
      title: 'Video Streaming Service',
      description: 'Video streaming platform with HLS streaming, user authentication, and content management system built with Angular and AWS.'
    }
  ];

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    // GET /api/projects - Get all projects
    if (request.method === 'GET' && request.url.includes('/api/projects')) {
      console.log('Intercepting GET /api/projects');
      return of(new HttpResponse({
        status: 200,
        body: this.projects
      })).pipe(delay(500)); // Simulate network delay
    }

    // GET /api/projects/:id - Get project by ID
    if (request.method === 'GET' && request.url.match(/\/api\/projects\/\d+$/)) {
      const id = parseInt(request.url.split('/').pop() || '0', 10);
      const project = this.projects.find(p => p.id === id);
      console.log(`Intercepting GET /api/projects/${id}`);
      
      if (project) {
        return of(new HttpResponse({
          status: 200,
          body: project
        })).pipe(delay(300));
      } else {
        return of(new HttpResponse({
          status: 404,
          body: { error: 'Project not found' }
        })).pipe(delay(300));
      }
    }

    // POST /api/projects - Create new project
    if (request.method === 'POST' && request.url.includes('/api/projects')) {
      console.log('Intercepting POST /api/projects');
      const newProject: Project = {
        ...(request.body as Project),
        id: Math.max(...this.projects.map(p => p.id)) + 1
      };
      this.projects.push(newProject);
      
      return of(new HttpResponse({
        status: 201,
        body: newProject
      })).pipe(delay(500));
    }

    // PUT /api/projects/:id - Update project
    if (request.method === 'PUT' && request.url.match(/\/api\/projects\/\d+$/)) {
      const id = parseInt(request.url.split('/').pop() || '0', 10);
      const index = this.projects.findIndex(p => p.id === id);
      console.log(`Intercepting PUT /api/projects/${id}`);
      
      if (index !== -1) {
        this.projects[index] = { ...request.body as Project, id };
        return of(new HttpResponse({
          status: 200,
          body: this.projects[index]
        })).pipe(delay(500));
      } else {
        return of(new HttpResponse({
          status: 404,
          body: { error: 'Project not found' }
        })).pipe(delay(300));
      }
    }

    // DELETE /api/projects/:id - Delete project
    if (request.method === 'DELETE' && request.url.match(/\/api\/projects\/\d+$/)) {
      const id = parseInt(request.url.split('/').pop() || '0', 10);
      const index = this.projects.findIndex(p => p.id === id);
      console.log(`Intercepting DELETE /api/projects/${id}`);
      
      if (index !== -1) {
        this.projects.splice(index, 1);
        return of(new HttpResponse({
          status: 200,
          body: { message: 'Project deleted successfully' }
        })).pipe(delay(500));
      } else {
        return of(new HttpResponse({
          status: 404,
          body: { error: 'Project not found' }
        })).pipe(delay(300));
      }
    }

    // POST /api/contact - Send contact message
    if (request.method === 'POST' && request.url.includes('/api/contact')) {
      console.log('Intercepting POST /api/contact', request.body);
      
      return of(new HttpResponse({
        status: 200,
        body: {
          success: true,
          message: 'Your message has been sent successfully!',
          data: request.body
        }
      })).pipe(delay(1000)); // Simulate longer processing time
    }

    // If the request doesn't match any of our mock endpoints, pass it through
    return next.handle(request);
  }
}

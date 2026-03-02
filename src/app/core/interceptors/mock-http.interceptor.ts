import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Project } from '../models/project.model';

const projects: Project[] = [
  { id: 1, title: 'E-Commerce Platform',       description: 'Full-stack e-commerce app with Angular, Node.js, and MongoDB. Includes product catalog, cart, payments, and admin dashboard.' },
  { id: 2, title: 'ML Image Classifier',        description: 'Stone classification model using TensorFlow/Python with 95% accuracy. Deployed as a REST API.' },
  { id: 3, title: 'Real-time Chat App',          description: 'WebSocket chat with Angular frontend and Node.js backend. Supports group chats, file sharing, and auth.' },
  { id: 4, title: 'Data Analytics Dashboard',   description: 'Interactive dashboard with Angular and Kendo UI. Real-time charts using Chart.js and D3.js.' },
  { id: 5, title: 'Task Management System',     description: 'Collaborative tool with drag-and-drop, real-time notifications, and team features.' },
  { id: 6, title: 'Weather Forecast App',       description: 'Weather app using OpenWeatherMap API with location search, 7-day forecast, and alerts.' },
  { id: 7, title: 'Social Media Platform',      description: 'Social network with profiles, posts, comments, likes, and Firebase notifications.' },
  { id: 8, title: 'Video Streaming Service',    description: 'HLS streaming platform with auth and CMS, built with Angular and AWS.' },
];

function mockResponse<T>(body: T, status = 200) {
  return of(new HttpResponse<T>({ status, body })).pipe(delay(500));
}

export const mockHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/api/projects')
    return mockResponse([...projects]);

  if (method === 'GET' && /\/api\/projects\/\d+$/.test(url)) {
    const id = +url.split('/').pop()!;
    const project = projects.find(p => p.id === id);
    return project ? mockResponse(project) : mockResponse({ error: 'Project not found' }, 404);
  }

  if (method === 'POST' && url === '/api/projects') {
    const newProject: Project = { ...(req.body as Project), id: Math.max(...projects.map(p => p.id)) + 1 };
    projects.push(newProject);
    return mockResponse(newProject, 201);
  }

  if (method === 'PUT' && /\/api\/projects\/\d+$/.test(url)) {
    const id = +url.split('/').pop()!;
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) { projects[index] = { ...(req.body as Project), id }; return mockResponse(projects[index]); }
    return mockResponse({ error: 'Project not found' }, 404);
  }

  if (method === 'DELETE' && /\/api\/projects\/\d+$/.test(url)) {
    const id = +url.split('/').pop()!;
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) { projects.splice(index, 1); return mockResponse({ message: 'Deleted successfully' }); }
    return mockResponse({ error: 'Project not found' }, 404);
  }

  if (method === 'POST' && url === '/api/contact')
    return mockResponse({ success: true, message: 'Message sent!', data: req.body });

  return next(req);
};

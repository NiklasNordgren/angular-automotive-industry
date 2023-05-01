import { Injectable } from '@angular/core';
import { Tool } from '../model/tool.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  private apiURL: string = environment.apiURL;
  private boardId: string = environment.boardId;
  private apiKey: string = environment.apiKey;
  private apiToken: string = environment.apiToken;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tool[]> {
    return this.http.get<Tool[]>(`${this.apiURL}/boards/${this.boardId}/cards?key=${this.apiKey}&token=${this.apiToken}`);
  }

}

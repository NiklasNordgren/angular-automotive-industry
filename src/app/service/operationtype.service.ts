import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OperationType } from '../model/operationtype.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperationTypeService {

  private apiURL: string = environment.apiURL;
  private boardId: string = environment.boardId;
  private apiKey: string = environment.apiKey;
  private apiToken: string = environment.apiToken;
  
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<OperationType[]>(`${this.apiURL}/boards/${this.boardId}/lists?key=${this.apiKey}&token=${this.apiToken}`);
  }

}

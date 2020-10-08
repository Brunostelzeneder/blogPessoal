import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Postagens } from '../model/Postagens';

@Injectable({
  providedIn: 'root'
})
export class PostagensService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token'))
  };

  getAllPostagens() {
    return this.http.get('http://localhost:8080/postagens', this.token);
  }

  postPostagens(postagem: Postagens) {
    return this.http.post('http://localhost:8080/postagens', postagem, this.token);
  }
}
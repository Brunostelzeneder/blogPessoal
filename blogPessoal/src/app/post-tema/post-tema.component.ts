import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-post-tema',
  templateUrl: './post-tema.component.html',
  styleUrls: ['./post-tema.component.css']
})
export class PostTemaComponent implements OnInit {

  tema: Tema = new Tema();
  listaTema: Tema[];
  
  constructor(
    private temaService: TemaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllTema();
  }

  findAllTema() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTema = resp;
    });
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.tema.id).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

  cadastrar() {
    if(!this.tema.descricao)
      alert('Você precisa dizer o nome do tema, oras 🤨');
    else
      this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
        this.tema = resp;
        this.router.navigate(['/feed']);
        alert('Seu tema foi cadastrado com sucesso 🤝');
      })
  }

}
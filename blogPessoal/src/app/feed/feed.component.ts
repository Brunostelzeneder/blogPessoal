import { Component, OnInit } from '@angular/core';
import { Postagem } from '../model/Postagem'
import { Tema } from '../model/Tema';
import { PostagensService } from '../service/postagem.service'
import { TemaService } from '../service/tema.service'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  key = 'data'
  reverse = true

  postagens: Postagem = new Postagem();
  listaPostagens: Postagem[];

  tema: Tema = new Tema();
  listaTema: Tema[];
  idTema: number;

  constructor(
    private postagensService: PostagensService,
    private temaService: TemaService
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);

    this.findAllPostagens();
    this.findAllTema();
  }

  findAllPostagens() {
    this.postagensService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp; 
    });
  }

  findAllTema() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTema = resp;
    });
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

  publicar() {
    this.tema.id = this.idTema;
    this.postagens.tema = this.tema;

    if(!(this.postagens.titulo && this.postagens.tema && this.postagens.texto))
      alert("Você precisa preencher todos os campos para poder postar... 😒");
    else
      this.postagensService.postPostagens(this.postagens).subscribe((resp: Postagem) => {
        this.postagens = resp;
        this.postagens = new Postagem();
        alert("Seu post foi publicado com sucesso! 👏");
        this.findAllPostagens();
      }) 
  }

}
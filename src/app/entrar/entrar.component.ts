import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar() {
    this.authService.entrar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp

    environment.token = this.userLogin.token
    environment.nome = this.userLogin.nome
    environment.foto = this.userLogin.foto
    environment.id = this.userLogin.id

    console.log(environment.token)
    console.log(environment.nome)
    console.log(environment.foto)
    console.log(environment.id)

    this.router.navigate(['/inicio'])
    }, erro =>{
      if (erro.status == 401) {
        alert('Usuário ou senha incorretos!')
      }
    })
    }
  }

//no video ele não adiciona uma routerLink no botão entrar (entrar.component.html) para a página inicio. Porém, depois que ele faz o login do
//usuario, ao clicar no entrar, direciona para a página de inicio (e o meu não)//
//Preciso verificar se o subscribe riscado dessa página irá afetar o restante.//
//Continua aparecendo o erro 'Usuario ou senha incorretos' mesmo quando a senha está correta e não carrega para a página de inicio e mesmo 
//acrescentando um router, fica errado porque vai direto para a pág de inicio com o erro 'Usuario ou senha incorretos', 
//não sei se está relacionado ao subscribe//

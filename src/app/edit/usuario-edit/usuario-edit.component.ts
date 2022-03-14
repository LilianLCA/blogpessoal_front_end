import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  id_usuario: number
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token ==''){
      alert('Sua sessão expirou, por favor, faça login novamente!')
      this.router.navigate(['/entrar'])
    }

    this.id_usuario = this.route.snapshot.params['id_usuario']
    this.findByIdUsuario(this.id_usuario)
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

  atualizar(){
    this.usuario.tipo = this.tipoUsuario

    if(this.usuario.senha != this.confirmarSenha){
      alert('As senhas estão incorretas!')
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/inicio'])
        alert('Usuário atualizado com sucesso!')
    
        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0
        this.router.navigate(['/entrar'])
      })
    }
  }

  findByIdUsuario(id_usuario: number){
    this.authService.getByIdUsuario(this.id_usuario).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

}

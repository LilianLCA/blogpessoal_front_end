import { Postagem } from "./Postagem"

export class Tema{
    public id_tema: number
    public descricao: string
    public postagem: Postagem[]
}
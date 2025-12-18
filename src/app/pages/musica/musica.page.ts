import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/apiService/api';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.page.html',
  styleUrls: ['./musica.page.scss'],
  standalone: false,
})
export class MusicaPage implements OnInit {

  user: any;
  users: any;
  posts: any;
  post: any = {
    title: "",
    body: "",
    userId: null
  };
  compareWith: any;

  constructor(private route: ActivatedRoute,
    private menu: MenuController,
    private api: ApiService) { }

  ionViewWillEnter() {
    this.getUsuarios();
    this.getPosts();
  }

  ngOnInit() {
    this.menu.close("mainMenu");
  }

  getUsuario(userId: any) {
    this.api.getUsuario(userId).subscribe((data) => {
      console.log(data)
      this.user = data;
    });
  }

  getUsuarios() {
    this.api.getUsuarios().subscribe((data) => {
      this.users = data;
    });
  }

  getPosts() {
    this.api.getPosts().subscribe((data) => {
      this.posts = data;
      this.posts.reverse();
    }, (error) => { console.log(error); });
  }

  guardarPost() {
  if (!this.post.userId) {
    this.post.userId = this.user.id;
  }

  if (!this.post.id) {
    // Crear post
    this.api.createPost(this.post).subscribe(
      (nuevoPost) => {
        console.log("Creado Correctamente", nuevoPost);
        this.posts.unshift(nuevoPost); 
        this.limpiar();
      },
      error => console.log("Error " + error)
    );
  } else {
    // Actualizar post (simulación)
    this.api.updatePost(this.post.id, this.post).subscribe(
      (updatedPost) => {
        console.log("Actualizado Correctamente", updatedPost);
        // Buscar el índice del post en el array local
        const index = this.posts.findIndex((p: any) => p.id === this.post.id);
        if (index > -1) {
          this.posts[index] = { ...this.post }; // Reemplazamos los datos localmente
        }
        this.limpiar();
      },
      error => console.log("Error " + error)
    );
  }
}

  /*
  setPost(_post: any){
    this.post=_post;
    this.getUsuario(_post.userId);
    this.compareWith = this.compareWithFn;
  }
  */


  setPost(_post: any) {
    this.post = _post;
    // Busca el usuario correspondiente y asigna a this.user
    this.user = this.users.find((u: any) => u.id === _post.userId);
    this.compareWith = this.compareWithFn;
  }


  eliminarPost(_post: any) {
    console.log("eliminar")
    this.api.deletePost(_post.id).subscribe(
      success => {
        console.log("Eliminado correctamente");
        this.getPosts();
      },
      error => {
        console.log("Error " + error)
      }
    )
  }

  compareWithFn = (o1: any, o2: any) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  limpiar() {
    this.post = {
      title: "",
      body: "",
      userId: null
    };
    this.user = null; // también puedes limpiar el select
  }
}

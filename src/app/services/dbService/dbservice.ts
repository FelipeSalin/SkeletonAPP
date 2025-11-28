import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Dbservice {
  
  public db!: SQLiteObject;

  // observable
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private toastController: ToastController) {
    this.initDatabase();
  }

  private initDatabase() {
    this.sqlite.create({
      name: 'musicadb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.db = db;
      this.createTables();
      this.isDBReady.next(true); // Emitimos true cuando la base de datos esté lista
      this.presentToast('Base de datos y tabla creadas con éxito');
    }).catch(error => console.log(error));
  }

  private createTables() {
    this.db.executeSql(
      `CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT,
        password TEXT,
        nombre TEXT,
        apellido TEXT,
        email TEXT,
        fecha_nacimiento TEXT
      )`, [])
      .then(() => this.presentToast('Table created'))
      .catch(error => this.presentToast('Error creating table' + error));
  }

  validarUsuario(usuario: string, password: string) {
    return this.db.executeSql('SELECT * FROM usuarios WHERE usuario = ? AND password = ?', [usuario, password])
      .then((res) => {
        if (res.rows.length > 0) {
          return res.rows.item(0); // Retorna el primer usuario que coincide
        } else {
          return null; // Retorna null si no se encontró ningún usuario
        }
      })
      .catch(error => this.presentToast('Error al obtener usuario por credenciales:' + error));
  }

  insertUsuario(usuario: string, password: string, nombre: string, apellido: string, email: string, selectedDate: string) {
    return this.db.executeSql(`
      INSERT INTO usuarios (usuario, password, nombre, apellido, email, fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?);
    `, [usuario, password, nombre, apellido, email, selectedDate])
    .then(() => this.presentToast('Usuario insertado correctamente'))
    .catch(error => this.presentToast('Error al insertar usuario:' + error));
  }

  // FALTARÍA DELETE/ELIMINAR Y UPDATE/ACTUALIZAR DE USUARIO

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  getIsDBReady() {
    return this.isDBReady.asObservable();
  }
}

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Ponto } from './../../model/ponto.model';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ponto: Ponto  = new Ponto()
  horarios: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public db: AngularFireDatabase) {
    let that = this;
    this.horarios = db.list("/horarios", {
        query: {
          limitToLast: 1,
          orderByKey: true
        }
    });
    this.horarios.subscribe(function(item) {
      if (item.length) {
        console.log(item[0]);
        console.log(that.ponto);
        that.ponto = JSON.parse(JSON.stringify(item[0]))
        that.ponto.$key = item[0].$key;
        if (that.ponto.saida) {
          that.ponto = new Ponto();
        }
        console.log(that.ponto);
      }
      else {
        that.ponto = new Ponto();
      }
    })
    console.log(this.horarios);
  }

  marcarChegada() {
    console.log(this.ponto);
    this.ponto.chegada = new Date();
    console.log(this.ponto.chegada.toString());
    this.horarios.push({'chegada': this.ponto.chegada.toString()});
  }

  marcarSaindaAlmoco() {
    console.log('marcarSaindaAlmoco');
     this.ponto.saidaAlmoco = new Date()
     console.log(JSON.stringify(this.ponto));
     this.horarios.update(this.ponto.$key, {chegada: this.ponto.chegada.toString(), saidaAlmoco: this.ponto.saidaAlmoco.toString()});
  }

  marcarVoltaAlmoco() {
    console.log('marcarVoltaAlmoco');
     this.ponto.voltaAlmoco = new Date()
     console.log(JSON.stringify(this.ponto));
     this.horarios.update(this.ponto.$key, {chegada: this.ponto.chegada.toString(), saidaAlmoco: this.ponto.saidaAlmoco.toString(), 
      voltaAlmoco: this.ponto.voltaAlmoco.toString()});
  }

  marcarSaida() {
    console.log('marcarSaida');
    this.ponto.saida = new Date()
    console.log(JSON.stringify(this.ponto));
    this.horarios.update(this.ponto.$key, {chegada: this.ponto.chegada.toString(), saidaAlmoco: this.ponto.saidaAlmoco.toString(), 
      voltaAlmoco: this.ponto.voltaAlmoco.toString(), saida: this.ponto.saida.toString()});
  }

}

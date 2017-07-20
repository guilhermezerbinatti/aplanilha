import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  horarios: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    this.horarios = db.list("/horarios",{
        query: {
          orderByValue: true,
          limitToLast: 30
        }});
  }

  calcularHoras(item: any) {
    var msecPerMinute = 1000 * 60;
    var msecPerHour = msecPerMinute * 60;
    
    var interval = new Date(item.saidaAlmoco).getTime() - new Date(item.chegada).getTime();
    interval += new Date(item.saida).getTime() - new Date(item.voltaAlmoco).getTime();
    
    var hours = Math.fround(interval / msecPerHour );
    interval = interval - (hours * msecPerHour );
    
    return hours;
  }
}

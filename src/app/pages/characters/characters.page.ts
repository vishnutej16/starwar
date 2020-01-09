import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, IonContent } from '@ionic/angular';

import { DataService } from 'src/app/providers/data/data.service';
import { CharactersDataService } from 'src/app/providers/characters-data/characters-data.service';
import { LoadingService } from 'src/app/providers/loading/loading.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  characters: Array<any> = [];
  loadNextURL: string = 'https://swapi.co/api/people/';

  hasScrollbar = false;
  items: Array<any> = [];

  @ViewChild(IonContent, { static: false }) private content: IonContent;

  // checks if there's a scrollbar when the user resizes the window or zooms in/out
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkForScrollbar();
  }

  queryText: string;

  constructor(private router: Router,
    private api: CharactersDataService,
    private dataService: DataService,
    private loading: LoadingService) { }

  ngOnInit() {
    this.loading.present();
    this.api.getCharactersData(this.loadNextURL).then((data) => {
      this.characters = data.results;
      console.log(this.characters);
      this.loadNextURL = data.next;
      console.log(this.loadNextURL);
      this.initializeItems();
      this.loading.dismiss();
    }, (err) => {
      console.log("something went wrong", err);
      this.loading.dismiss();
    });
  }

  incrementItemList() {
    this.loading.present();
    this.api.getCharactersData(this.loadNextURL).then((data) => {
      let nextItems = data.results;
      this.characters = this.characters.concat(nextItems);
      console.log(this.characters.length);
      this.loadNextURL = data.next;
      console.log(this.loadNextURL);
      this.initializeItems();
      this.checkForScrollbar();
      this.loading.dismiss();
    }, (err) => {
      console.log("something went wrong", err);
      this.loading.dismiss();
    });
  }

  loadData(event) {
    let data = [];
    setTimeout(() => {
      this.api.getCharactersData(this.loadNextURL).then((data) => {
        let nextItems = data.results;
        this.characters = this.characters.concat(nextItems);
        console.log(this.characters.length);
        this.loadNextURL = data.next;
        console.log(this.loadNextURL);
        this.initializeItems();
        event.target.complete();
        this.checkForScrollbar();
      }, (err) => {
        console.log("something went wrong", err);
      });
    }, 500);
  }

  async checkForScrollbar() {
    const scrollElement = await this.content.getScrollElement();
    this.hasScrollbar = scrollElement.scrollHeight > scrollElement.clientHeight;
    console.log("hasScrollbar" + this.hasScrollbar);
  }

  // Pull to refresh
  doRefresh(event) {
    this.api.getCharactersData('https://swapi.co/api/people/').then((data) => {
      this.characters = data.results;
      console.log(this.characters);
      this.loadNextURL = data.next;
      console.log(this.loadNextURL);
      event.target.complete();
      this.hasScrollbar = false;
    }, (err) => {
      console.log("something went wrong", err);
    });
  }

  goToPage(url) {
    this.dataService._characterDetailsURL = url;
    this.router.navigate(['/character-details'])
  }

  // Search
  updateCharacterList() {
    console.log(this.queryText)
    this.characters = this.characters.filter(item => {
      return item.name.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1;
    });
  }

  initializeItems() {
    this.items = this.characters
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


}

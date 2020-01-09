import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/providers/data/data.service';
import { CharactersDataService } from 'src/app/providers/characters-data/characters-data.service';
import { LoadingService } from 'src/app/providers/loading/loading.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.page.html',
  styleUrls: ['./character-details.page.scss'],
})
export class CharacterDetailsPage implements OnInit {

  character: any;

  constructor(private dataService: DataService,
    public api: CharactersDataService,
    private loading: LoadingService) { }

  ngOnInit() {
    this.loading.present();
    const url = this.dataService._characterDetailsURL;
    this.api.getCharacterDetails(url).then((data) => {
      this.character = data;
      this.loading.dismiss();
    }, (err) => {
      console.log("something went wrong", err);
      this.loading.dismiss();
    });
  }

}

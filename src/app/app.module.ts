import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { FirebaseService } from './firebase.service';
import { ContentComponent } from './content/content.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { FooterComponent } from './footer/footer.component';
import { HttpService } from './http.service';
import { TimeAgoPipe } from 'time-ago-pipe';
import { CommentPageComponent } from './comment-page/comment-page.component';
import { AppRoutingModule } from './app-routing.module';
import { FavoritesService } from './favorites.service';
import { FavoritesComponent } from './favorites/favorites.component';
import { UtilityService } from './utility.service';
import { ItemCommentComponent } from './item-comment/item-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContentComponent,
    ItemCardComponent,
    FooterComponent,
    TimeAgoPipe,
    CommentPageComponent,
    FavoritesComponent,
    ItemCommentComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [FirebaseService, HttpService, FavoritesService, UtilityService],
  bootstrap: [AppComponent]
})
export class AppModule { }

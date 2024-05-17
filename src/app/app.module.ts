import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    // AppComponent should not be declared here
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes) 
  ],
  providers: [],
})
export class AppModule { 
  ngDoBootstrap() {}
}

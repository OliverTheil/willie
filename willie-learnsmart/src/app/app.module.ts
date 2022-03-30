import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { PlanComponent } from './plan/plan.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    FrontpageComponent,
    PlanComponent,
    MainComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

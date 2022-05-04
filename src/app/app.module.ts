import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestContainerComponent } from './containers/test-container/test-container.component';
import { CurrentDraftSessionListComponent } from './components/current-draft-session-list/current-draft-session-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './AddonModules/angular-material-module/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { SessionResultListComponent } from './components/session-result-list/session-result-list.component';
import { SessionListFilterComponent } from './components/session-list-filter/session-list-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicQueryFormComponent } from './components/dynamic-query-form/dynamic-query-form.component';
import { AutoDraftPanelComponent } from './containers/auto-draft-panel/auto-draft-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    TestContainerComponent,
    CurrentDraftSessionListComponent,
    SessionResultListComponent,
    SessionListFilterComponent,
    DynamicQueryFormComponent,
    AutoDraftPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

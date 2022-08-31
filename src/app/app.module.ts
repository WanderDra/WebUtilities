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
import { DraggablePopupComponent } from './components/draggable-popup/draggable-popup.component';
import { TripDetailPopupComponent } from './popups/trip-detail-popup/trip-detail-popup.component';
import { PortalDirective } from './directives/portal.directive';
import { PortalOutletDirective } from './directives/portal-outlet.directive';
import { RecordPilotResponsePopupComponent } from './popups/record-pilot-response-popup/record-pilot-response-popup.component';
import { AddNewDraftSessionComponent } from './components/add-new-draft-session/add-new-draft-session.component';
import { TripboardComponent } from './tripboard/tripboard.component';
import { TbBoardComponent } from './tripboard/components/tb-board/tb-board.component';
import { PilotDraftComponent } from './pilot-draft/pilot-draft.component';
import { PdSessionStatusPanelComponent } from './pilot-draft/components/pd-session-status-panel/pd-session-status-panel.component';
import { PdTripBoardComponent } from './pilot-draft/components/pd-trip-board/pd-trip-board.component';

@NgModule({
  declarations: [
    AppComponent,
    TestContainerComponent,
    CurrentDraftSessionListComponent,
    SessionResultListComponent,
    SessionListFilterComponent,
    DynamicQueryFormComponent,
    AutoDraftPanelComponent,
    DraggablePopupComponent,
    TripDetailPopupComponent,
    PortalDirective,
    PortalOutletDirective,
    RecordPilotResponsePopupComponent,
    AddNewDraftSessionComponent,
    TripboardComponent,
    TbBoardComponent,
    PilotDraftComponent,
    PdSessionStatusPanelComponent,
    PdTripBoardComponent
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

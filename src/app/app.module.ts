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
import { PdMissingRankChoiceDialogComponent } from './pilot-draft/dialogs/pd-missing-rank-choice-dialog/pd-missing-rank-choice-dialog.component';
import { PdConfirmSubmissionDialogComponent } from './pilot-draft/dialogs/pd-confirm-submission-dialog/pd-confirm-submission-dialog.component';
import { PdConfirmTripAcceptanceDialogComponent } from './pilot-draft/dialogs/pd-confirm-trip-acceptance-dialog/pd-confirm-trip-acceptance-dialog.component';
import { PdCountdownPipe } from './pilot-draft/pipes/pd-countdown.pipe';
import { ZldatePipe } from './pilot-draft/pipes/zldate.pipe';
import { UsbConnectionComponent } from './components/usb-connection/usb-connection.component';
import { UsbPermissionDialogComponent } from './dialogs/usb-permission-dialog/usb-permission-dialog.component';
import { DraggableDialogComponent } from './utils/draggable-dialog/draggable-dialog.component';
import { DialogFrameComponent } from './utils/draggable-dialog/components/dialog-frame/dialog-frame.component';
import { DialogOverlayComponent } from './utils/draggable-dialog/components/dialog-overlay/dialog-overlay.component';
import { NgCaptureComponent } from './components/ng-capture/ng-capture.component';
import { NgxCaptureModule } from 'ngx-capture';
import { SpringTestPageComponent } from './components/spring-test-page/spring-test-page.component';
import { ReserveAllocationComponent } from './components/reserve-allocation/reserve-allocation.component';
import { AutocompleteInputDirective } from './directives/autocomplete-input.directive';
import { AutocompleteInputComponent } from './utils/autocomplete-input/autocomplete-input.component';
import { AutocompleteInputDemoComponent } from './utils/autocomplete-input/demo/autocomplete-input-demo/autocomplete-input-demo.component';
import { RaSearchPanelComponent } from './components/reserve-allocation/components/ra-search-panel/ra-search-panel.component';
import { RaReportHeaderComponent } from './components/reserve-allocation/components/ra-report-header/ra-report-header.component';
import { RaForecastCoverageChartComponent } from './components/reserve-allocation/components/ra-forecast-coverage-chart/ra-forecast-coverage-chart.component';
import { RaUncoveredRequirementsChartComponent } from './components/reserve-allocation/components/ra-uncovered-requirements-chart/ra-uncovered-requirements-chart.component';
import { RaReservePilotCalendarComponent } from './components/reserve-allocation/components/ra-reserve-pilot-calendar/ra-reserve-pilot-calendar.component';

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
    PdTripBoardComponent,
    PdMissingRankChoiceDialogComponent,
    PdConfirmSubmissionDialogComponent,
    PdConfirmTripAcceptanceDialogComponent,
    PdCountdownPipe,
    ZldatePipe,
    UsbConnectionComponent,
    UsbPermissionDialogComponent,
    DraggableDialogComponent,
    DialogFrameComponent,
    DialogOverlayComponent,
    NgCaptureComponent,
    SpringTestPageComponent,
    ReserveAllocationComponent,
    AutocompleteInputDirective,
    AutocompleteInputComponent,
    AutocompleteInputDemoComponent,
    RaSearchPanelComponent,
    RaReportHeaderComponent,
    RaForecastCoverageChartComponent,
    RaUncoveredRequirementsChartComponent,
    RaReservePilotCalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxCaptureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

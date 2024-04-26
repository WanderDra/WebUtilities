import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TtModalWindowContainerComponent } from './components/tt-modal-window/tt-modal-window-container/tt-modal-window-container.component';
import { TtModalWindowComponent } from './components/tt-modal-window/tt-modal-window.component';

const routes: Routes = [
  {
    path: '',
    component: TtModalWindowComponent
  },
  {
    path: 'ttap',
    component: TtModalWindowContainerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

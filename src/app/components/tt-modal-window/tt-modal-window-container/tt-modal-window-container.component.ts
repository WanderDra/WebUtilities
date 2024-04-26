import { Component, DoCheck, ElementRef, HostListener, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TripTradePosition, TripTradePositionStatus, TripTradeWindowData } from '../models/tt-general-model';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'crew-nav-tt-modal-window-container',
  templateUrl: './tt-modal-window-container.component.html',
  styleUrls: ['./tt-modal-window-container.component.scss']
})
export class TtModalWindowContainerComponent implements OnInit, OnDestroy, DoCheck {

  tripTradeData$ = new BehaviorSubject<TripTradeWindowData | null>(null);

  ttPositionStatus = TripTradePositionStatus;

  isMonitorExpanded: boolean = false;
  isAddPanelShowing: boolean = false;
  stoppedPositionAmount: number = 0;
  availablePositionList: TripTradePosition[][] = [];

  AVAILABLE_POSITIONS_EACH_ROW = 2;

  @ViewChild('errorDetailPopupRef') errorDetailPopupRef: ElementRef;
  @ViewChild('containerRef') containerRef: ElementRef<HTMLDivElement>;

  subscriptions = new Subscription();

  comparePosition = (pos1: TripTradePosition, pos2: TripTradePosition) =>
    pos1.base + pos1.equipment + pos1.seat === pos2.base + pos2.equipment + pos2.seat

  constructor() { }

  ngOnInit(): void {
    this.initData();
    this.loadTestData();
    setTimeout(() => {
      this.ngDoCheck();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngDoCheck(): void {
    if (this.containerRef) {
      window.resizeTo(284, this.containerRef.nativeElement.offsetHeight + 100);
    }
  }

  initData(): void {
    const ttDataSub = this.tripTradeData$.subscribe(data => {
      this.stoppedPositionAmount = this.getStoppedPositionAmount();
      this.initAddPositionSelection(data?.positionsAvailable);
      this.updatePositionMonitoring(data);
    });
    this.subscriptions.add(ttDataSub);
  }

  // Return a *copy* of original position list
  getAvailablePositionList(positionsAvailable: TripTradePosition[]): TripTradePosition[][] {
    if (!positionsAvailable) {
      return [];
    }
    const availablePositionList: TripTradePosition[][] = []
    let availablePositionRow: TripTradePosition[] = [];
    positionsAvailable.forEach(position => {
      if (availablePositionRow.length >= this.AVAILABLE_POSITIONS_EACH_ROW) {
        availablePositionList.push(availablePositionRow);
        availablePositionRow = [];
      }
      availablePositionRow.push({...position});
    });
    if (availablePositionRow.length > 0) {
      availablePositionList.push(availablePositionRow);
      availablePositionRow = [];
    }
    return availablePositionList;
  }

  onMonitoringClick(): void {
    this.isMonitorExpanded = !this.isMonitorExpanded;
  }

  onAddClick(): void {
    this.isAddPanelShowing = !this.isAddPanelShowing;
    if (this.isAddPanelShowing) {
      this.availablePositionList = this.getAvailablePositionList(this.tripTradeData$.value.positionsAvailable);
    }
  }

  onAddApply(): void {
    const updatedData = this.tripTradeData$.value;
    const updatedSelectedPos: TripTradePosition[] = [];
    this.availablePositionList.forEach(row => {
      row.forEach(position => {
        if (position.isSelected) {
          updatedSelectedPos.push(position);
        } 
      })
    });
    updatedData.positionsAvailable.forEach(pos => {
      if (this.isPositionInList(updatedSelectedPos, pos)) {
        pos.isSelected = true;
      } else {
        pos.isSelected = false;
      }
    });
    this.tripTradeData$.next(updatedData);
    this.updatePositionMonitoring();
    // WIP: Further process updated data
  }

  onAddClose(): void {
    this.isAddPanelShowing = false;
  }

  getStoppedPositionAmount(): number {
    let stoppedPositionAmount = 0;
    this.tripTradeData$.value?.positionsMonitoring?.forEach(posItem => {
      if (posItem.status === TripTradePositionStatus.PAUSED ||
        posItem.status === TripTradePositionStatus.STOPPED) {
          ++stoppedPositionAmount;
      }
    });
    return stoppedPositionAmount;
  }

  initAddPositionSelection(availablePositions: TripTradePosition[]): void {
    availablePositions?.forEach(position => {
      if (this.isPositionInList(this.tripTradeData$.value.positionsPreference, position)) {
        position.isSelected = true;
      }
    });
  }

  updatePositionMonitoring(fromData?: TripTradeWindowData): void {
    let updatedData: TripTradeWindowData = null;
    if (fromData) {
      updatedData = fromData;
    } else {
      updatedData = this.tripTradeData$.value;
    }
    if (!updatedData) {
      return;
    }
    updatedData.positionsMonitoring = [];
    updatedData.positionsAvailable.forEach(pos => {
      if (pos.isSelected) {
        updatedData.positionsMonitoring.push(pos);
      }
    });
    if (!fromData) {
      this.tripTradeData$.next(updatedData);
    }
  }

  onErrorIconClick(posItem: TripTradePosition): void {
    setTimeout(() => {
      posItem.isShowingErrorDetail = !posItem.isShowingErrorDetail;
    });
  }

  isPositionInList(posList: TripTradePosition[], targetPos: TripTradePosition): boolean {
    const pos = posList.find(pos => this.comparePosition(pos, targetPos));
    return pos ? true : false;
  } 

  @HostListener('document:click', ['$event'])
  public documentClick(event: Event): void {
    if (!this.errorDetailPopupRef?.nativeElement?.contains(event.target)) {
      this.tripTradeData$.value.positionsMonitoring.forEach(posItem => {
        if (posItem.isShowingErrorDetail) {
          posItem.isShowingErrorDetail = false;
        }
      })
    }
  }

  private loadTestData(): void {
    const testData = new TripTradeWindowData();
    testData.totalTrades = 1035;
    testData.positionsMonitoring = [];
    testData.positionsAvailable = [
      {
        base: 'ANC',
        equipment: '11',
        seat: 'C',
        status: TripTradePositionStatus.PROCESSING,
        isProcessingByOther: false,
      },
      {
        base: 'ANC',
        equipment: '11',
        seat: 'F',
        status: TripTradePositionStatus.PROCESSING,
        isProcessingByOther: false,
      },
      {
        base: 'LAX',
        equipment: '11',
        seat: 'C'
      },
      {
        base: 'LAX',
        equipment: '11',
        seat: 'F'
      },
      {
        base: 'MEM',
        equipment: '11',
        seat: 'C',
        status: TripTradePositionStatus.PAUSED,
        isProcessingByOther: false,
      },
      {
        base: 'MEM',
        equipment: '11',
        seat: 'F',
        status: TripTradePositionStatus.STOPPED,
        isProcessingByOther: true,
      },
      {
        base: 'MEM',
        equipment: '30',
        seat: 'C'
      },
      {
        base: 'MEM',
        equipment: '30',
        seat: 'F'
      },
      {
        base: 'IND',
        equipment: '67',
        seat: 'C'
      },
      {
        base: 'IND',
        equipment: '67',
        seat: 'F'
      },
      {
        base: 'OAK',
        equipment: '67',
        seat: 'C'
      },
      {
        base: 'OAK',
        equipment: '67',
        seat: 'F'
      },
      {
        base: 'EUR',
        equipment: '57',
        seat: 'C'
      }
    ]
    testData.positionsPreference = [
      {
        base: 'MEM',
        equipment: '11',
        seat: 'C'
      },
      {
        base: 'MEM',
        equipment: '11',
        seat: 'F'
      },      
      {
        base: 'ANC',
        equipment: '11',
        seat: 'F'
      },
      {
        base: 'ANC',
        equipment: '11',
        seat: 'C'
      }
    ]
    this.tripTradeData$.next(testData);
  }

}

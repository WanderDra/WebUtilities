import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { password1 } from 'src/app/constants/password';
import { UsbPermissionDialogComponent } from 'src/app/dialogs/usb-permission-dialog/usb-permission-dialog.component';
import { DialogSelections } from 'src/app/models/diglog';

export class DeviceCMD {
    readonly READ = new Uint8Array([27, 109]);
    readonly RESET = new Uint8Array([27, 97]);
}

@Component({
  selector: 'app-usb-connection',
  templateUrl: './usb-connection.component.html',
  styleUrls: ['./usb-connection.component.scss']
})
export class UsbConnectionComponent implements OnInit {

  devices: any;
  usbVendorId: number = 1659;
  port: SerialPort;
  deviceCMD = new DeviceCMD();
  output: string = '';
  curOutput: string = '';
  isAccess: boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  initUSB(): void {
    if (navigator.usb) {
      this.handleUSB().then(() => {
        this.connectToDevice();
      });
    } else {
      console.error("WebUSB not enabled (chrome://flags/#new-usb-backend)");
    }
  }

  async handleUSB(): Promise<void> {
    this.devices = await navigator.usb.requestDevice(
      { filters: [{
        vendorId: 1659
      }]}
    );
    console.log(this.devices);
  }

  async connectToDevice(): Promise<void> {
    
    navigator.usb.getDevices().then(devices => {
      return devices.filter(device => device.vendorId === 1659)[0];
    }).then(async device => {
        await device.open();
        if (device.configuration === null)
          await device.selectConfiguration(1);
        await device.claimInterface(1);
        await device.controlTransferOut({
          requestType: 'vendor',
          recipient: 'interface',
          request: 0x01,  // vendor-specific request: enable channels
          value: 0x0013,  // 0b00010011 (channels 1, 2 and 5)
          index: 0x0001   // Interface 1 is the recipient
      });
      }
    )
  }

  initSerialPort(): void {
    navigator.serial.requestPort({ filters: [{ usbVendorId: this.usbVendorId }]}).then((port) => {
      // Connect to `port` or add it to the list of available ports.
      console.log(port);
      this.port = port;
      this.port.open({baudRate: 9600}).then(
        () => {
          this.readingDataFromPort(this.port);
        }
      )
    }).catch((e) => {
      // The user didn't select a port.
      console.log(e);
    });
  }

  async readingDataFromPort(port: SerialPort): Promise<void> {
    const textDecoder = new TextDecoder("utf-8");
    while (port.readable) {
      const reader = port.readable.getReader();
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            // |reader| has been canceled.
            this.output += '\n';
            break;
          }
          // Do something with |value|...
          this.output += this.toHexString(value.buffer);
          if (value.length === 1 && value[0] === 48) {
            this.curOutput = this.output.split('\n').pop();
            this.isAccess = this.validatePassword(this.curOutput);
            this.output += '\n';
          }
        }
      } catch (error) {
        // Handle |error|...
        console.log(error);
      } finally {
        reader.releaseLock();
      }
    }
  }

  onApplyPermissionClick(): void {
    this.dialog.open(UsbPermissionDialogComponent, {
      width: '250px'
    }).afterClosed().subscribe(
      response => {
        if (response === DialogSelections.ACCEPT) {
          // this.initUSB();
          this.initSerialPort();
        }
      }
    );
  }

  onDisconnectClick(): void {
    this.port.close();
  }

  onShowDeviceInfoClick(): void {
    // navigator.usb.getDevices().then(devices => {
    //   console.log(devices);
    // })
    console.log(this.port);
  }

  async onReadClick(): Promise<void> {
    const writer = this.port.writable.getWriter();
    await writer.write(this.deviceCMD.READ);
    writer.releaseLock();
  }

  async onResetClick(): Promise<void> {
    const writer = this.port.writable.getWriter();
    await writer.write(this.deviceCMD.RESET);
    writer.releaseLock();
  }

  private toHexString(buffer) {
    return [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
  }

  private validatePassword(password: string) {

    let modifiedPass = password.replace(/0/g, '');
    let modifiedTarget = password1.replace(/0/g, '');
    console.log('1', modifiedPass);
    console.log('2', modifiedTarget);
    const maxLength = modifiedTarget.length;
    let validateNum = 0;
    for (let i = 0; i < modifiedPass.length; ++i){
      if (modifiedPass.charAt(i) === modifiedTarget.charAt(i)) {
        validateNum++;
      }
    }
    if (validateNum / maxLength > 0.9) {
      return true;
    }
    else {
      return false;
    }
  }
}

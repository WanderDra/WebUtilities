export function openWindowCenter(url: string, title: string, w: number, h: number): void {
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop
    const newWindow = window.open(url, title, 
      `
      scrollbars=no,
      toolbar=no,
      titlebar=no,
      status=no,
      menubar=no,
      
      width=${w}, 
      height=${h}, 
      top=${top}, 
      left=${left}
      `
    )
    // width=${w / systemZoom}, 
    // height=${h / systemZoom}, 
    if (window.focus) newWindow.focus();
}
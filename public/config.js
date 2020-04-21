const electron = require('electron');
/**
 * 
 * 主窗口的配置
 */

const mwCfg = () => {

  return {
    width: 800,
    height: 600,
    // width: electron.screen.getPrimaryDisplay().workAreaSize.width, 
    // height: electron.screen.getPrimaryDisplay().workAreaSize.height, 
    title: 'Ale Client',
    resizable: false,
    frame: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      webviewTag: true
    }
  };
};


const mwCfgTm = () => {


  return { 
    // fullscreen: true,

    show: false,
    width: electron.screen.getPrimaryDisplay().workAreaSize.width,
    height: electron.screen.getPrimaryDisplay().workAreaSize.height,
    transparent: true, 
    frame: false,
          webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      webviewTag: true
    }
  }

  // return {
  //   fullscreen: true,
  //   transparent: true,
  //   resizable: true,
  //   frame: false,
  //     webPreferences: {
  //     webSecurity: false,
  //     nodeIntegration: true,
  //     webviewTag: true
  //   }
  // };



  // return {
  //   width: 400,
  //   height: 300,
  //   title: 'Ale Client',
  //   resizable: false,
  //   frame: false,
  //   webPreferences: {
  //     webSecurity: false,
  //     nodeIntegration: true,
  //     webviewTag: true
  //   }
  // };
};



/**
 * web站点窗口配置
 */

const wsCfg = (mainWindow) => {

  return {
    width: 1024,
    height: 681,
    frame: false,
    title: 'Ale Client',
    parent: mainWindow,
    show: false,
    webPreferences: {
      webSecurity: true,
      nodeIntegration: true,
      webviewTag: true
    }
  }
}

const Config = {
  'mwCfg': mwCfg,
  'wsCfg': wsCfg,
  'mwCfgTm': mwCfgTm
}


module.exports = Config;
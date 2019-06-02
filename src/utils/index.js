import { Message } from '_modules/element-ui';
import { getLocal, setLocal } from './storage';

export function getToken() {
  return getLocal('miaosuan-token');
}

export function setToken(token) {
  return setLocal('miaosuan-token', token);
}

// 时间戳转日期
function formatNumber(n) {
  const $n = n.toString();
  return $n[1] ? $n : `0${$n}`;
}

export const formatTime = (date) => {
  const temp = new Date(date);
  const year = temp.getFullYear();
  const month = temp.getMonth() + 1;
  const day = temp.getDate();
  const hour = temp.getHours();
  const minute = temp.getMinutes();
  const second = temp.getSeconds();
  return `${[year, month, day].map(formatNumber).join('/')} ${[
    hour,
    minute,
    second,
  ]
    .map(formatNumber)
    .join(':')}`;
};

// 判断缴费时间是否快到期
export const remainingDays = date =>
  (date - new Date().getTime()) / 1000 / 60 / 60 / 24;

// 价格转千
export function priceThousandth(str) {
  if (!str && str !== 0) {
    return undefined;
  }
  const strs = (typeof str === 'string' ? str : str.toString()).split('.');
  const newStr = strs[0].replace(/\d{1,3}(?=(\d{3})+$)/g, s => `${s},`);
  if (strs.length > 1) {
    return `${newStr}.${strs[1]}`;
  }
  return newStr;
}
// 判断浏览器是否低于ie8
export function browserType() {
  const explorer = navigator.userAgent.toLowerCase();
  let isIe8 = false;
  if (explorer.indexOf('msie') >= 0) {
    const ver = explorer.match(/msie ([\d.]+)/)[1];
    if (Math.floor(Number(ver)) < 9) {
      isIe8 = true;
    }
  }
  return isIe8;
}
export function userBrowser() {
  const userAgent = navigator.userAgent;
  // 取得浏览器的userAgent字符串
  const isOpera = userAgent.indexOf('Opera') > -1;
  // 判断是否Opera浏览器
  const isIE =
    userAgent.indexOf('compatible') > -1 &&
    userAgent.indexOf('MSIE') > -1 &&
    !isOpera;
  // 判断是否IE浏览器
  const isEdge = userAgent.indexOf('Edge') > -1;
  // 判断是否IE的Edge浏览器
  const isFF = userAgent.indexOf('Firefox') > -1;
  // 判断是否Firefox浏览器
  const isSafari =
    userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1;
  // 判断是否Safari浏览器
  const isChrome =
    userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1;
  // 判断Chrome浏览器
  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(userAgent);
    // var fIEVersion = parseFloat(RegExp["$1"]);
    // if (fIEVersion === 7) {
    //     return "IE7";
    // } else if (fIEVersion === 8) {
    //     return "IE8";
    // } else if (fIEVersion === 9) {
    //     return "IE9";
    // } else if (fIEVersion === 10) {
    //     return "IE10";
    // } else if (fIEVersion === 11) {
    //     return "IE11";
    // } else {
    //     return "0";
    // }
    // IE版本过低
    return 'IE';
  }
  if (isOpera) {
    return 'Opera';
  }
  if (isEdge) {
    return 'Edge';
  }
  if (isFF) {
    return 'FF';
  }
  if (isSafari) {
    return 'Safari';
  }
  if (isChrome) {
    return 'Chrome';
  }
  return 'Other';
}
// 文件下载
export function downFile(datas, name, type) {
  const types = type || 'application/vnd.ms-excel';
  const blob = new Blob([datas], { type: types });
  if (userBrowser() === 'IE' || userBrowser() === 'Edge') {
    if ('msSaveOrOpenBlob' in navigator) {
      window.navigator.msSaveOrOpenBlob(blob, name);
    } else {
      Message.error(
        '浏览器版本过低，暂不支持下载导出操作，请升级浏览器后再进行此操作',
      );
    }
  } else {
    const alink = document.createElement('a');
    alink.href = window.URL.createObjectURL(blob);
    alink.download = name;
    alink.style.display = 'none';
    document.body.appendChild(alink);
    alink.click();
    window.URL.revokeObjectURL(alink.href);
    document.body.removeChild(alink);
  }
}

import Cookies from './node_modules/_modules/js-cookie';
import { encrypt, decrypt } from './node_modules/@/utils/crypto';

// 获取cookie
export function getCookie(name) {
  if (!name) {
    return '';
  }
  if (Cookies.get(encrypt(name)) === null) {
    return '';
  }
  return decrypt(Cookies.get(encrypt(name)));
}
// 设置cookie
export function setCookie(name, data, expires = '') {
  return Cookies.set(encrypt(name), encrypt(data), { expires });
}
// 删除cookie
export function removeCookie(name) {
  return Cookies.remove(encrypt(name));
}
// 获取session
export function getSession(name) {
  if (!name) {
    return '';
  }
  if (sessionStorage.getItem(encrypt(name)) === null) {
    return '';
  }
  return decrypt(sessionStorage.getItem(encrypt(name)));
}
// 设置session
export function setSession(name, data) {
  return sessionStorage.setItem(encrypt(name), encrypt(data));
}
// 删除session
export function removeSession(name) {
  return sessionStorage.removeItem(encrypt(name));
}
// 获取local
export function getLocal(name) {
  if (!name) {
    return '';
  }
  if (localStorage.getItem(encrypt(name)) === null) {
    return '';
  }
  return decrypt(localStorage.getItem(encrypt(name)));
}
// 设置local
export function setLocal(name, data) {
  return localStorage.setItem(encrypt(name), encrypt(data));
}
// 删除local
export function removeLocal(name) {
  return localStorage.removeItem(encrypt(name));
}
//  判断浏览器是否低于ie8
export function browserType(userAgent) {
  const explorer = userAgent.toLowerCase();
  let isIe8 = false;
  if (explorer.indexOf('msie') >= 0) {
    const ver = explorer.match(/msie ([\d.]+)/)[1];
    if (Math.floor(Number(ver)) < 9) {
      isIe8 = true;
    }
  }
  return isIe8;
}

// 监听storage
export function resetSetItem(key, newVal) {
  if (key === 'sItem') {
    const newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem(k, val) {
        sessionStorage.setItem(k, val);
        newStorageEvent.initStorageEvent(
          'setItem',
          false,
          false,
          k,
          null,
          val,
          null,
          null,
        );
        window.dispatchEvent(newStorageEvent);
      },
    };
    return storage.setItem(key, newVal);
  }
  return undefined;
}

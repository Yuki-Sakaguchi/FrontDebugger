import './style.css';

interface Options {
  speed: number;
  style: boolean;
  parent: string,
  className: string;
  test(): boolean;
}

const defaultOptions: Options = {
  speed: 2000,
  style: true,
  parent: 'body',
  className: 'front-debugger',
  test () {
    return location.search.indexOf('mode=test') >= 0;
  }
}

/**
 * テスト環境でのデバッグ用クラス
 */
export default class FrontDebugger {
  el?: HTMLElement;
  options: Options;

  constructor (options: Options) {
    this.options = { ...defaultOptions, ...options };
    if (this.options.test()) {
      const div = document.createElement('div');
      div.classList.add(this.options.className);
      document.querySelector(this.options.parent)!.appendChild(div);
      this.el = div;
    }
  }

  log (text: string) {
    if (this.options.test()) {
      console.log(text);
      this.frontLog(text);
    }
  }

  frontLog (text: string) {
    const p = document.createElement('p');
    p.textContent = text;
    this.el?.append(p);
    setTimeout(() => {
      p.remove();
    }, this.options.speed);
  }
}

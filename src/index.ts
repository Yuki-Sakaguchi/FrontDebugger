import './style.css';

interface Options {
  test: () => boolean;
  isFront: boolean;
  isBackground: boolean;
  prefix: string,
  displayedTime: number;
  parent: string,
  className: string;
}

const defaultOptions: Options = {
  test: () => location.search.indexOf('mode=test') >= 0,
  isFront: true,
  isBackground: true,
  prefix: '[test log]',
  displayedTime: 2000,
  parent: 'body',
  className: 'front-debugger',
}

/**
 * テスト環境でのデバッグ用クラス
 */
export default class FrontDebugger {
  el?: HTMLElement;
  options: Options;

  constructor (options: Options) {
    this.options = { ...defaultOptions, ...options };
    if (this.options.test() && this.options.isFront) {
      const div = document.createElement('div');
      div.classList.add(this.options.className);
      document.querySelector(this.options.parent)!.appendChild(div);
      this.el = div;
    }
  }

  /**
   * テストモードの時だけログを表示する
   */
  log (...text: any[]) {
    if (this.options.test()) {
      if (this.options.isBackground) {
        if (this.options.prefix) {
          console.log(...[this.options.prefix, ...text]);
        } else {
          console.log(...text);
        }
      }
      if (this.options.isFront && this.el) {
        this.frontLog(...text);
      }
    }
  }

  /**
   * フロント側にログを表示する
   */
  frontLog (...text: any[]) {
    const p = document.createElement('p');
    
    // オブジェクトや配列が来ることも想定して文字列以外の場合には JSON.stringify() で文字列化して読めるようにする
    p.textContent = text.reduce((pv, cv, ci, arr) => {
      let text = (typeof cv === 'string') ? cv : JSON.stringify(cv);
      return `${pv} ${text}`;
    }, '').trim();

    this.el?.append(p);
    setTimeout(() => {
      p.remove();
    }, this.options.displayedTime);
  }
}

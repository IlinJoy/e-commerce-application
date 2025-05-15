import { tokenCookiesConfig } from './token-cookie-config';

type CookieOptions = {
  path?: string;
  domain?: string;
  expires?: Date | string;
  maxAge?: number;
  secure?: boolean;
  samesite?: 'strict' | 'lax' | 'none';
};

export class CookieHandler {
  constructor(
    private name: string,
    private options: CookieOptions
  ) {}

  public get() {
    const regexp = new RegExp('(?:^|; )' + this.name + '=([^;]*)');
    const matches = document.cookie.match(regexp);
    return matches ? decodeURIComponent(matches[1]) : null;
  }

  public set(value: string, cookieOptions?: CookieOptions) {
    const options = { ...this.options, ...cookieOptions };

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    const cookieString = Object.entries(options).reduce(
      (string, [key, value]) => {
        const cookieKey = key === 'maxAge' ? 'max-age' : key;
        return string + `; ${cookieKey}=${value.toString()}`;
      },
      `${this.encode(this.name, value)}`
    );

    document.cookie = cookieString;
  }

  public delete() {
    this.set('', { maxAge: -1 });
  }

  private encode(name: string, value: string) {
    return encodeURIComponent(name) + '=' + encodeURIComponent(value);
  }
}

export const tokenCookieHandler = new CookieHandler(tokenCookiesConfig.name, tokenCookiesConfig.options);

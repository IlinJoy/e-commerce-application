import type { CookieConfigOptions } from './token-cookie-config';
import { cookieConfig } from './token-cookie-config';

type CookieOptions = {
  path?: string;
  domain?: string;
  expires?: Date | string;
  maxAge?: number;
  secure?: boolean;
  samesite?: 'strict' | 'lax' | 'none';
};

class CookieHandler<T extends Record<string, CookieConfigOptions>> {
  constructor(private config: T) {}

  public get(key: keyof T & string) {
    const regexp = new RegExp(`(?:^|; )${key}=([^;]*)`);
    const matches = document.cookie.match(regexp);
    return matches ? decodeURIComponent(matches[1]) : null;
  }

  public set(key: keyof T & string, value: string, cookieOptions?: CookieOptions) {
    const options = { ...this.config[key], ...cookieOptions };

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    const cookieString = Object.entries(options).reduce(
      (string, [key, value]) => {
        const cookieKey = key === 'maxAge' ? 'max-age' : key;
        return string + `; ${cookieKey}=${value.toString()}`;
      },
      `${this.encode(key, value)}`
    );

    document.cookie = cookieString;
  }

  public delete(key: keyof T & string) {
    this.set(key, '', { maxAge: -1 });
  }

  private encode(name: string, value: string) {
    return encodeURIComponent(name) + '=' + encodeURIComponent(value);
  }
}

export const cookieHandler = new CookieHandler(cookieConfig);

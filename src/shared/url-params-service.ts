import { Provider } from "../framework/provider";
import { Injectable } from "../framework/ioc";

@Injectable()
export class UrlParamsService extends Provider {
  public getSearchParamValue(key: string): string {
    var params = new URLSearchParams(window.location.search);
    var value = params.get(key) as string;
    return value;
  }
}

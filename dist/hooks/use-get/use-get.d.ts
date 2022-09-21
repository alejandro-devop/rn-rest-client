import { RequestConfigType } from '../../types/HttpClient.types';
declare const useGet: <UrlType extends string, ResponseType_1 extends unknown>(url: UrlType, options?: RequestConfigType) => (boolean | ResponseType_1 | {
    refresh: (overrideOptions?: RequestConfigType) => Promise<void>;
})[];
export default useGet;

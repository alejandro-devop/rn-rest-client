import { RequestConfigType } from '../../types/HttpClient.types';
declare const useGet: <UrlType extends string, ResponseType_1 extends unknown>(url: UrlType, options?: RequestConfigType) => [ResponseType_1, boolean, {
    refresh: (o?: RequestConfigType) => Promise<void>;
}];
export default useGet;

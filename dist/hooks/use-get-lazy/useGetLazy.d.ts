import { RequestConfigType, RequestConfigOverrideType } from '../../types/HttpClient.types';
declare type UseGetLazyReturnType = [(overrideOptions?: RequestConfigOverrideType) => Promise<any>, boolean];
declare const useGetLazy: <UrlType extends string>(url: UrlType, options?: RequestConfigType) => UseGetLazyReturnType;
export default useGetLazy;

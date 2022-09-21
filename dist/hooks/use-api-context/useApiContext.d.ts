declare const useApiContext: () => {
    client: import("../../rest-client-provider/HttpClient").default | undefined;
};
export default useApiContext;

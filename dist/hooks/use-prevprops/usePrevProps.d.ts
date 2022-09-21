/**
 * Hook to store the previous value for the props passed to a component
 * @author Alejandro Quiroz <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param value
 * @returns
 */
declare const usePrevProps: <R extends {
    [key: string]: any;
}>(value: R) => R;
export default usePrevProps;

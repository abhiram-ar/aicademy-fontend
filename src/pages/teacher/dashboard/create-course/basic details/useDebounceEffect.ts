/* eslint-disable */

import { useEffect, DependencyList } from "react";

export function useDebounceEffect(
    fn: () => void,
    waitTime: number,
    deps?: DependencyList
) {
    useEffect(() => {
        const t = setTimeout(() => {
            /* eslint-disable @typescript-eslint/ban-ts-comment */
            // @ts-ignore
            fn.apply(undefined, deps);
        }, waitTime);

        return () => {
            clearTimeout(t);
        };
    }, deps);
}

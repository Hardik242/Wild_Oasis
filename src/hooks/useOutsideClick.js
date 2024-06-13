import {useEffect, useRef} from "react";

export default function useOutsideClick(
    handler,
    listenCapturing = true,
    isScroll = false
) {
    const ref = useRef();

    useEffect(
        function () {
            function handleClick(evnt) {
                if (ref.current && !ref.current.contains(evnt.target))
                    handler();
            }

            document.addEventListener("click", handleClick, listenCapturing);
            if (isScroll)
                document.addEventListener(
                    "scroll",
                    handleClick,
                    listenCapturing
                );

            return () => {
                document.removeEventListener(
                    "click",
                    handleClick,
                    listenCapturing
                );
                document.addEventListener(
                    "scroll",
                    handleClick,
                    listenCapturing
                );
            };
        },
        [handler, listenCapturing]
    );

    return ref;
}

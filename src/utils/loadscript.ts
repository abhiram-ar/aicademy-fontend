export const loadScript = (src: string) => {
    return new Promise((resolve) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            console.log("script already loaded");
            return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => {
            script.remove(); //handle memory leak
            resolve(false);
        };

        document.body.appendChild(script);
    });
};

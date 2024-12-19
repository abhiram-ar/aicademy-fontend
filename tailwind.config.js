/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                RedHat: ["Red Hat Display", "serif"],
				publicSans:["Public Sans", "serif"]
            },
            colors: {
                main: "#FFDC58",
                mainAccent: "#ffc800",
                overlay: "rgba(0,0,0,0.8)",
                bg: "#FEF2E8",
                text: "#000",
                border: "#000",
                darkBg: "#374151",
                darkText: "#eeefe9",
                darkBorder: "#000",
                secondaryBlack: "#212121",
                paperYellow: "#fffbee",
                sidebar: {
                    DEFAULT: "hsl(var(--sidebar-background))",
                    foreground: "hsl(var(--sidebar-foreground))",
                    primary: "hsl(var(--sidebar-primary))",
                    "primary-foreground":
                        "hsl(var(--sidebar-primary-foreground))",
                    accent: "hsl(var(--sidebar-accent))",
                    "accent-foreground":
                        "hsl(var(--sidebar-accent-foreground))",
                    border: "hsl(var(--sidebar-border))",
                    ring: "hsl(var(--sidebar-ring))",
                },
            },
            borderRadius: {
                base: "5px",
            },
            boxShadow: {
                light: "4px 4px 0px 0px #000",
                dark: "4px 4px 0px 0px #000",
            },
            translate: {
                boxShadowX: "4px",
                boxShadowY: "4px",
                reverseBoxShadowX: "-4px",
                reverseBoxShadowY: "-4px",
            },
            fontWeight: {
                base: "500",
                heading: "700",
            },
            keyframes: {
                "caret-blink": {
                    "0%,70%,100%": {
                        opacity: "1",
                    },
                    "20%,50%": {
                        opacity: "0",
                    },
                },
            },
            animation: {
                "caret-blink": "caret-blink 1.25s ease-out infinite",
            },
        },
    },
    plugins: [import("tailwindcss-animate")],
};

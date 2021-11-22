// theme.js
import { extendTheme, ThemeConfig } from "@chakra-ui/react"

const config: ThemeConfig = {
    initialColorMode: "dark",
  useSystemColorMode: false,
}



const themeConf = {
    config,
    components: {
        Button: {
            // 1. We can update the base styles
            baseStyle: {
                fontWeight: "bold", // Normally, it is "semibold"
                _focus: { boxShadow: 'none' },
                borderRadius: 20,
            },
            // 2. We can add a new button size or extend existing
            sizes: {
                xl: {
                    h: "56px",
                    fontSize: "lg",
                    px: "32px",
                },
            },
            // 3. We can add a new visual variant
            variants: {
                "with-shadow": {
                    bg: "red.400",
                    // boxShadow: "0 0 2px 2px #efdfde",
                },
                // 4. We can override existing variants
            },
        },
    },

}

export default extendTheme(themeConf)
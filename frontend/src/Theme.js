import { extendTheme } from '@chakra-ui/react'

// 2. Define the new text styles
const theme = extendTheme({

    styles: {
      global: () => ({
        body: {
          // bgGradient:"linear(to-b, orange.100, purple.300)"
          // bg: "#44337A          ",
          // color:"white"
        },
      }),
    },

  textStyles: {
    h1: {
      // you can also use responsive styles
      fontSize: ['48px', '72px'],
      fontWeight: 'bold',
      lineHeight: '110%',
      letterSpacing: '-2%',
    },
    h2: {
      fontSize: ['36px', '48px'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
    },
  },
})
export default theme;
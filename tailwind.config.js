/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./StackNavigator.{js,jsx,ts,tsx}", "./screens/HomeScreen.{js,jsx,ts,tsx}", "./screens/ChatScreen.{js,jsx,ts,tsx}", "./screens/LoginScreen.{js,jsx,ts,tsx}", "./screens/SignupScreen.{js,jsx,ts,tsx}", "./screens/LoginScreen.{js,jsx,ts,tsx}", "./screens/OnBoardingScreen.{js,jsx,ts,tsx}", "./components/NavBar.{js,jsx,ts,tsx}", "./components/Header.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      "white": '#ffffff',
      "space-cadet": "#2D3142",
      "platinum": "#E6E6E6",
      "alabaster": "#E9E4DD",
      "mandarin": "#EF8354",
      "black-coral": "#4F5D75",
      "shadow": "#91816B",
      "light-mandarin": "#edb095",
    }
  },
  plugins: [],
}

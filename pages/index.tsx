import { ThemeProvider } from "@mui/material";
import MainTheme from "../Components/themes/MainTheme";
import HomePage from "./HomePage";



export default function Home() {
  return (
    <>
      <ThemeProvider theme={MainTheme}>
        <div>
          <HomePage/>
        </div>
      </ThemeProvider>
    </>
    
  );
}


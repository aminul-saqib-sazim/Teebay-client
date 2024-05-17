import "@/styles/globals.css";

import { Provider as ReduxProvider } from "react-redux";

import { Toaster } from "@/shared/components/shadui/sonner";
import AppInitializer from "@/shared/components/wrappers/AppInitializer";
import ThemeProvider from "@/shared/components/wrappers/ThemeProvider";
import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { store } from "@/shared/redux/store";
import { TCustomAppProps } from "@/shared/typedefs";

export default function App(props: TCustomAppProps) {
  const { Component, pageProps } = props;

  const component = Component.Layout ? (
    <Component.Layout>
      <Component {...pageProps} />
    </Component.Layout>
  ) : (
    <Component {...pageProps} />
  );

  return (
    <ReduxProvider store={store}>
      <AppInitializer>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <Toaster duration={NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS} />
          {Component.Guard ? <Component.Guard>{component}</Component.Guard> : component}
        </ThemeProvider>
      </AppInitializer>
    </ReduxProvider>
  );
}

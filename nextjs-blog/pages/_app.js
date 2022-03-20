import "../global.css";
import Layout from "../components/layout";
import { NextUIProvider } from "@nextui-org/react";
import { EmpDataContextProvider } from "../store/employeeDataStore";
import { AccDataContextProvider } from "../store/accountDataStore";

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <EmpDataContextProvider>
        <AccDataContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AccDataContextProvider>
      </EmpDataContextProvider>
    </NextUIProvider>
  );
}

export default MyApp

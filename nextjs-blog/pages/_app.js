import "../global.css";
import Layout from "../components/layout";
import { NextUIProvider } from "@nextui-org/react";
import { EmpDataContextProvider } from "../store/employeeDataStore";
import { AccDataContextProvider } from "../store/accountDataStore";
import { UserRegisterDataContextProvider } from "../store/userRegisterDataStore";

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
        <UserRegisterDataContextProvider>
          <EmpDataContextProvider>
            <AccDataContextProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AccDataContextProvider>
          </EmpDataContextProvider>
        </UserRegisterDataContextProvider>
    </NextUIProvider>
  );
}

export default MyApp

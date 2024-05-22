import {createRoot} from "react-dom/client";
import App from "@/pages/App";
import { Provider } from "react-redux";
import { setupStore } from "./redux/store";
import "@styles/style.scss";

const root = document.getElementById("root");

if(!root){
    throw Error("Root is undefined");
}

const store = setupStore();

createRoot(root).render(
    <>
    <Provider store={store}> 
        <App />
    </Provider> 
    </>
);




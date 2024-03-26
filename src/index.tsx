import {createRoot} from "react-dom/client";
import "./styles/index.scss";
import App from "@pages/App/App";


const root = document.getElementById("root");

if(!root){
    throw Error("Root is undefined");
}

createRoot(root).render(
    <App />
);




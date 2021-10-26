import React from "react";
import { Provider } from "react-redux";
import { store } from "../../store";
import Exchange from "../Exchange";
import { Container } from "./App.styled";

const App = (): JSX.Element => {
    return (
        <Provider store={store}>
            <Container>
                <Exchange />
            </Container>
        </Provider>
    );
}

export default App;
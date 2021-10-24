import React, { FC } from "react";
import { Container } from "./App.styled";

const App: FC = (): JSX.Element => {
    return (
        <Container>
            <div>
                <h1>Sell EUR</h1>
                <p>€1 = $1.16</p>
                <div>
                    <button>EUR</button>
                    <p>Balance: 10</p>
                    <input type="number" placeholder="0"></input>
                </div>
                <button>↓</button>
                <div>
                    <button>USD</button>
                    <p>Balance: 30</p>
                    <input type="number" placeholder="0"></input>
                </div>
                <button>Sell EUR to USD</button>
            </div>
        </Container>
    );
}

export default App;
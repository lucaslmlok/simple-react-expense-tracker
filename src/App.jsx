import Provider from "./components/Provider";
import Balance from "./components/Balance";
import History from "./components/History";
import AddNew from "./components/AddNew";

function App() {
    return (
        <Provider>
            <div className="container">
                <h1>Expense Tracker</h1>
                <Balance />
                <History />
                <AddNew />
            </div>
        </Provider>
    );
}

export default App;

function App() {
    return (
        <div className="container">
            <h1>Expense Tracker</h1>

            <section className="balance">
                <h2>Your Balance</h2>
                <p className="balance__amount">$400.00</p>

                <div className="balance__table">
                    <div className="balance__cell balance__cell--income">
                        <label className="balance__label">Income</label>
                        <p className="balance__amount balance__amount--sub">
                            $500.00
                        </p>
                    </div>
                    <div className="balance__cell balance__cell--expense">
                        <label className="balance__label">Expense</label>
                        <p className="balance__amount balance__amount--sub">
                            $100.00
                        </p>
                    </div>
                </div>
            </section>

            <section className="history">
                <h2>History</h2>
                <ul className="history__list">
                    <li className="history__item history__item--expense">
                        <p className="history__title">Books</p>
                        <p className="history__amount">-100</p>
                    </li>
                    <li className="history__item history__item--income">
                        <p className="history__title">Payment</p>
                        <p className="history__amount">+500</p>
                    </li>
                </ul>
            </section>

            <section className="add-new">
                <h2>Add new transaction</h2>
                <form>
                    <div className="add-new__field">
                        <label htmlFor="text">Text</label>
                        <input
                            type="text"
                            id="text"
                            placeholder="Enter text..."
                        />
                    </div>
                    <div className="add-new__field">
                        <label htmlFor="amount">
                            Amount
                            <br />
                            (netgative + expense, positive + income)
                        </label>
                        <input
                            type="number"
                            id="amount"
                            placeholder="Enter amount..."
                        />
                    </div>
                    <button>Add transaction</button>
                </form>
            </section>
        </div>
    );
}

export default App;

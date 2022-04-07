import { useExpense } from "./Provider";

const displayAmount = (amount) => {
    if (isNaN(amount)) {
        throw new Error("Unknown amount Type");
    }
    const sign = amount > 0 ? "+" : "";
    return `${sign}${amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const History = () => {
    const expenses = useExpense();

    return (
        <section>
            <h2>History</h2>
            <ul className="history__list">
                {expenses.map((e) => (
                    <HistoryItem key={e.id} item={e} />
                ))}
            </ul>
        </section>
    );
};

const HistoryItem = ({ item }) => {
    const type = item.amount > 0 ? "income" : "expense";
    return (
        <li className={`history__item history__item--${type}`}>
            <p className="history__title">{item.title}</p>
            <p className="history__amount">{displayAmount(item.amount)}</p>
        </li>
    );
};

export default History;

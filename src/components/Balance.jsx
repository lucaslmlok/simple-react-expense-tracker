import { useMemo } from "react";
import { useExpense } from "./Provider";

const displayAmount = (amount) => {
    if (isNaN(amount)) {
        throw new Error("Unknown amount Type");
    }
    return `$${amount.toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Balance = () => {
    const expenses = useExpense();

    const totalIncome = useMemo(() => {
        return expenses.reduce((total, e) => {
            return e.amount > 0 ? total + e.amount : total;
        }, 0);
    }, [expenses]);

    const totalExpense = useMemo(() => {
        return expenses.reduce((total, e) => {
            return e.amount < 0 ? total + e.amount : total;
        }, 0);
    }, [expenses]);

    const balance = totalIncome + totalExpense;

    return (
        <section>
            <h2>Your Balance</h2>
            <p className="balance__amount">{displayAmount(balance)}</p>

            <div className="balance__table">
                <div className="balance__cell balance__cell--income">
                    <label className="balance__label">Income</label>
                    <p className="balance__amount balance__amount--sub">
                        {displayAmount(totalIncome)}
                    </p>
                </div>
                <div className="balance__cell balance__cell--expense">
                    <label className="balance__label">Expense</label>
                    <p className="balance__amount balance__amount--sub">
                        {displayAmount(totalExpense)}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Balance;

import { useState, useRef } from "react";
import { VscEdit, VscClose, VscSave, VscDiscard } from "react-icons/vsc";
import { format } from "date-fns";
import { useExpense, useExpenseDispatch } from "./Provider";

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
            {expenses.length ? (
                <ul className="history__list">
                    {expenses.map((e) => (
                        <HistoryItem key={e.id} item={e} />
                    ))}
                </ul>
            ) : (
                <div className="history__empty">No History</div>
            )}
        </section>
    );
};

const HistoryItem = ({ item }) => {
    const type = item.amount > 0 ? "income" : "expense";
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(item.title);
    const [amount, setAmount] = useState(item.amount);
    const titleRef = useRef(null);
    const amountRef = useRef(null);
    const dispatch = useExpenseDispatch();

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleDiscard = () => {
        setIsEditing(false);
        setTitle(item.title);
        setAmount(item.amount);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSave();
        }
    };

    const handleSave = () => {
        if (!title) {
            return titleRef.current.focus();
        }
        if (!amount) {
            return amountRef.current.focus();
        }
        dispatch({
            type: "edit",
            item: {
                id: item.id,
                title: title,
                amount: +amount,
                date: item.date,
            },
        });
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure to delete?")) {
            dispatch({
                type: "delete",
                id: item.id,
            });
        }
    };

    if (isEditing) {
        return (
            <li className={`history__item history__item--${type}`}>
                <div className="history__input-container">
                    <input
                        ref={titleRef}
                        className="history__input--title"
                        value={title}
                        onChange={handleTitleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <input
                        ref={amountRef}
                        type="number"
                        className="history__input--amount"
                        value={amount}
                        onChange={handleAmountChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <menu className="history__menu">
                    <li onClick={handleSave}>
                        <VscSave title="Save" size={24} />
                    </li>
                    <li onClick={handleDiscard}>
                        <VscDiscard title="Discard" size={24} />
                    </li>
                </menu>
                {item.date && (
                    <small className="history__date">
                        {format(item.date, "yyyy/MM/dd")}
                    </small>
                )}
            </li>
        );
    }

    return (
        <li className={`history__item history__item--${type}`}>
            <p className="history__title">{title}</p>
            <p className="history__amount">{displayAmount(amount)}</p>
            <menu className="history__menu">
                <li onClick={handleEdit}>
                    <VscEdit title="Edit" size={24} />
                </li>
                <li onClick={handleDelete}>
                    <VscClose title="Delete" size={24} />
                </li>
            </menu>
            {item.date && (
                <small className="history__date">
                    {format(item.date, "yyyy/MM/dd")}
                </small>
            )}
        </li>
    );
};

export default History;

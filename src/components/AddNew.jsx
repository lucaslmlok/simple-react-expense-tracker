import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import { parseISO } from "date-fns";
import { useExpenseDispatch } from "./Provider";

const AddNew = () => {
    const dispatch = useExpenseDispatch();
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(new Date());
    const titleRef = useRef(null);
    const amountRef = useRef(null);
    const dateRef = useRef(null);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleDateChange = (date) => {
        setDate(date);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) {
            return titleRef.current.focus();
        }
        if (!amount) {
            return amountRef.current.focus();
        }
        if (!date) {
            return dateRef.current.setFocus();
        }

        dispatch({
            type: "add",
            item: {
                id: uuidv4(),
                title: title,
                amount: +amount,
                date: date,
            },
        });
        setTitle("");
        setAmount("");
    };

    return (
        <section>
            <h2>Add new transaction</h2>
            <form onSubmit={handleSubmit}>
                <div className="add-new__field">
                    <label htmlFor="text">Text</label>
                    <input
                        ref={titleRef}
                        id="text"
                        value={title}
                        onChange={handleTitleChange}
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
                        ref={amountRef}
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="Enter amount..."
                    />
                </div>
                <div className="add-new__field">
                    <label htmlFor="date">Date</label>
                    <DatePicker
                        ref={dateRef}
                        selected={date}
                        onChange={handleDateChange}
                    />
                </div>
                <button className="btn" onClick={handleSubmit}>
                    Add transaction
                </button>
            </form>
        </section>
    );
};

export default AddNew;

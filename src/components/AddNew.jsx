import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useExpenseDispatch } from "./Provider";

const AddNew = () => {
    const dispatch = useExpenseDispatch();
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const titleRef = useRef(null);
    const amountRef = useRef(null);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) {
            return titleRef.current.focus();
        }
        if (!amount) {
            return amountRef.current.focus();
        }
        dispatch({
            type: "add",
            item: {
                id: uuidv4(),
                title: title,
                amount: +amount,
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
                <button onClick={handleSubmit}>Add transaction</button>
            </form>
        </section>
    );
};

export default AddNew;

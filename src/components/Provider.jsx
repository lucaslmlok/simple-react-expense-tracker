import { createContext, useContext, useReducer } from "react";

const ExpenseContext = createContext([]);
const ExpenseDispatchContext = createContext(null);

const initialExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
initialExpenses.forEach((e) => {
    e.date = e.date ? new Date(e.date) : undefined;
});

const Provider = ({ children }) => {
    const [expenses, dispatch] = useReducer(expenseReducer, initialExpenses);

    return (
        <ExpenseContext.Provider value={expenses}>
            <ExpenseDispatchContext.Provider value={dispatch}>
                {children}
            </ExpenseDispatchContext.Provider>
        </ExpenseContext.Provider>
    );
};

export const useExpense = () => {
    return useContext(ExpenseContext);
};

export const useExpenseDispatch = () => {
    return useContext(ExpenseDispatchContext);
};

const storeExpenses = (expenses) => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
};

const expenseReducer = (expenses, action) => {
    switch (action.type) {
        case "add": {
            const newExpenses = [...expenses, action.item];
            storeExpenses(newExpenses);
            return newExpenses;
        }
        case "edit": {
            const newExpenses = expenses.map((e) => {
                if (e.id === action.item.id) {
                    return action.item;
                }
                return e;
            });
            storeExpenses(newExpenses);
            return newExpenses;
        }
        case "delete": {
            const newExpenses = expenses.filter((e) => e.id !== action.id);
            storeExpenses(newExpenses);
            return newExpenses;
        }
        default: {
            throw Error("Unknown action: " + action.type);
        }
    }
};

export default Provider;

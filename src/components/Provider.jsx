import { createContext, useContext, useReducer } from "react";

const ExpenseContext = createContext([]);
const ExpenseDispatchContext = createContext(null);

const Provider = ({ children }) => {
    const [expenses, dispatch] = useReducer(expenseReducer, []);

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

const expenseReducer = (expenses, action) => {
    switch (action.type) {
        case "add": {
            return [...expenses, action.item];
        }
        case "edit": {
            return expenses.map((e) => {
                if (e.id === action.id) {
                    return action.item;
                }
                return e;
            });
        }
        case "delete": {
            return expenses.filter((e) => e.id !== action.id);
        }
        default: {
            throw Error("Unknown action: " + action.type);
        }
    }
};

export default Provider;

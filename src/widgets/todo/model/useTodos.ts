import { useState } from 'react';
import type { Todo } from '@entities/todo';
import { storage } from '@shared/lib/storage';

const STORAGE_KEY = 'todos';

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>(() => {
        return storage.get<Todo[]>(STORAGE_KEY) || [];
    });

    const saveTodos = (newTodos: Todo[]) => {
        setTodos(newTodos);
        storage.set(STORAGE_KEY, newTodos);
    };

    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: Date.now().toString(),
            text,
            completed: false,
            createdAt: Date.now(),
        };
        saveTodos([...todos, newTodo]);
    };

    const toggleTodo = (id: string) => {
        saveTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: string) => {
        saveTodos(todos.filter((todo) => todo.id !== id));
    };

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
    };
}

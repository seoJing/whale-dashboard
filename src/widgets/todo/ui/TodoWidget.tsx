import { useState } from 'react';
import { useTodos } from '../model/useTodos';
import { TodoItem } from './TodoItem';
import type { TodoSettings } from '@entities/widget';

interface TodoWidgetProps {
    settings?: TodoSettings;
    size?: { width: number; height: number };
}

export function TodoWidget({ settings = {}, size }: TodoWidgetProps) {
    const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
    const [inputValue, setInputValue] = useState('');

    const color = settings.color || '#2563eb';
    const scale = size ? size.width / 320 : 1;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            addTodo(inputValue.trim());
            setInputValue('');
        }
    };

    return (
        <div
            className="flex flex-col gap-4 p-4 bg-gray-50 rounded-xl h-full w-full"
            style={{ fontSize: `${scale}em` }}
        >
            <h2 className="text-lg font-semibold text-gray-800">Todo</h2>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': color } as React.CSSProperties}
                />
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-colors"
                    style={{ backgroundColor: color }}
                >
                    Add
                </button>
            </form>

            <div className="flex flex-col gap-2 overflow-y-auto">
                {todos.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-4">
                        No tasks yet
                    </p>
                ) : (
                    todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                            color={color}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

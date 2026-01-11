import type { Todo } from '../types';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    color?: string;
}

export function TodoItem({
    todo,
    onToggle,
    onDelete,
    color = '#2563eb',
}: TodoItemProps) {
    return (
        <div className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="w-5 h-5 rounded border-gray-300 focus:ring-2"
                style={
                    {
                        accentColor: color,
                        '--tw-ring-color': color,
                    } as React.CSSProperties
                }
            />
            <span
                className={`flex-1 text-sm ${
                    todo.completed
                        ? 'line-through text-gray-400'
                        : 'text-gray-700'
                }`}
            >
                {todo.text}
            </span>
            <button
                onClick={() => onDelete(todo.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
            >
                ✕
            </button>
        </div>
    );
}

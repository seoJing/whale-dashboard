import { useState } from 'react';
import { useBookmarks } from '../hooks/useBookmarks';
import type { BookmarksSettings } from '../types';

interface BookmarksWidgetProps {
    settings?: BookmarksSettings;
    size?: { width: number; height: number };
}

export function BookmarksWidget({ settings = {}, size }: BookmarksWidgetProps) {
    const { bookmarks, addBookmark, deleteBookmark } = useBookmarks();
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const color = settings.color || '#2563eb';
    const scale = size ? size.width / 300 : 1;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && url.trim()) {
            addBookmark(title.trim(), url.trim());
            setTitle('');
            setUrl('');
        }
    };

    return (
        <div
            className="flex flex-col gap-4 p-4 bg-gray-50 rounded-xl h-full w-full"
            style={{ fontSize: `${scale}em` }}
        >
            <h2 className="text-lg font-semibold text-gray-800">Bookmarks</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': color } as React.CSSProperties}
                />
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://..."
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
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
                {bookmarks.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-4">
                        No bookmarks yet
                    </p>
                ) : (
                    bookmarks.map((bookmark) => (
                        <div
                            key={bookmark.id}
                            className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <a
                                href={bookmark.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 text-sm text-gray-700 truncate"
                                style={{ color: color }}
                            >
                                {bookmark.title}
                            </a>
                            <button
                                onClick={() => deleteBookmark(bookmark.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

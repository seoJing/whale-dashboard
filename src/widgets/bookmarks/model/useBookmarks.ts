import { useState } from 'react';
import type { Bookmark } from '@entities/bookmark';
import { storage } from '@shared/lib/storage';

const STORAGE_KEY = 'bookmarks';

export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
        return storage.get<Bookmark[]>(STORAGE_KEY) || [];
    });

    const saveBookmarks = (newBookmarks: Bookmark[]) => {
        setBookmarks(newBookmarks);
        storage.set(STORAGE_KEY, newBookmarks);
    };

    const addBookmark = (title: string, url: string) => {
        const newBookmark: Bookmark = {
            id: Date.now().toString(),
            title,
            url,
            createdAt: Date.now(),
        };
        saveBookmarks([...bookmarks, newBookmark]);
    };

    const deleteBookmark = (id: string) => {
        saveBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
    };

    return {
        bookmarks,
        addBookmark,
        deleteBookmark,
    };
}

import { json, redirect } from "@remix-run/node";
import { Link, useRouteError, useLoaderData } from "@remix-run/react";

import NewNote, { links as newNoteLinks } from "../components/NewNote";
import { getStoredNotes, storeNotes } from "../data/notes";
import NoteList, { links as noteListLinks } from "../components/NoteList";

export default function NotesPage() {
    const notes = useLoaderData();

    return (
        <main>
            <NewNote />
            <NoteList notes={notes} />
        </main>
    )
};

export const loader = async () => {
    const notes = await getStoredNotes();
    if (!notes || notes.length === 0) {
        throw json(
            { message: 'Could not find any notes'},
            {
                status: 404,
                statusText: 'Not Found',
            }
        );
    }

    return notes;
};

export const action = async ({ request }) => {
    const formData = await request.formData();
    const noteData = {
        title: formData.get('title'),
        content: formData.get('content'),
    };

    if (noteData.title.trim().length < 5) {
        return {
            message: 'Invalid title - must be at least 5 characters',
        }
    }

    const existingNotes = await getStoredNotes();
    noteData.id = new Date().toISOString();
    const updatedNotes = existingNotes.concat(noteData);
    await storeNotes(updatedNotes);

    return redirect('/notes');
}

export function CatchBoundary() {
    const caughtResponse = useRouteError();

    const message = caughtResponse.data?.message || 'Data not found';

    return (
        <main className="info-message">
            <p>{message}</p>
        </main>
    )
}

export function ErrorBoundary({ error }) {
    return (
        <main className="error">
            <h1>An error related to your notes occured</h1>
            <p>{error?.message}</p>
            <p>Back to <Link to='/'>safety</Link></p>
        </main>
    )
}

export const links = () => {
    return [
        ...newNoteLinks(),
        ...noteListLinks(),
    ];
};

// export function meta() {
//     return {
//         title: 'All Notes',
//         description: 'Manage your notes'
//     };
// }
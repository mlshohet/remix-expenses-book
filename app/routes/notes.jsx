import { redirect } from "@remix-run/node";

import NewNote, { links as newNoteLinks } from "../components/NewNote";
import { getStoredNotes, storeNotes } from "../data/notes";
import NoteList, { links as noteListLinks } from "../components/NoteList";
import { useLoaderData } from "@remix-run/react";

export default function NotesPage() {
    const notes = useLoaderData();

    return (
    <main>
        <NewNote />
        <NoteList notes={notes} />
    </main>)
};

export const loader = async () => {
    const notes = await getStoredNotes();
    return notes;
};

export const action = async ({ request }) => {
    const formData = await request.formData();
    const noteData = {
        title: formData.get('title'),
        content: formData.get('content'),
    };

    const existingNotes = await getStoredNotes();
    noteData.id = new Date().toISOString();
    const updatedNotes = existingNotes.concat(noteData);
    await storeNotes(updatedNotes);

    return redirect('/notes');
}

export const links = () => {
    return [
        ...newNoteLinks(),
        ...noteListLinks(),
    ];
};
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";
import Overlay from "../utils/overlay";
import { documents as initialDocuments } from "../data/document";

const LOCAL_STORAGE_PREFIX = "document_";

const fetchDocuments = async () => {
  const response = await fetch("/api/documents", {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch documents");
  }
  return response.json();
};

const saveDocument = async (doc) => {
  const response = await fetch(`/api/documents/${doc.type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(doc),
  });

  if (!response.ok) {
    throw new Error("Failed to save document");
  }
};

const DocumentCards = () => {
  const [items, setItems] = useState(() => {
    // Load documents from localStorage
    const keys = Object.keys(localStorage).filter(key => key.startsWith(LOCAL_STORAGE_PREFIX));
    const storedItems = keys.map(key => JSON.parse(localStorage.getItem(key)));
    return storedItems.length ? storedItems : initialDocuments;
  });
  const [overlayImage, setOverlayImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(Date.now());

  useEffect(() => {
    // Save documents to localStorage whenever items are updated
    items.forEach(doc => {
      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${doc.type}`, JSON.stringify(doc));
    });

    // Fetch documents from the mock API
    fetchDocuments()
      .then((fetchedItems) => {
        setItems(fetchedItems);
        // Store the fetched items in localStorage
        fetchedItems.forEach(doc => {
          localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${doc.type}`, JSON.stringify(doc));
        });
      })
      .catch((error) => console.error(error));

    // Save documents every 5 seconds
    const interval = setInterval(() => {
      if (items.length) {
        setIsSaving(true);
        Promise.all(items.map(doc => saveDocument(doc)))
          .then(() => {
            setIsSaving(false);
            setLastSaveTime(Date.now());
          })
          .catch((error) => console.error(error));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [items]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const updatedItems = Array.from(items);
    const [movedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, movedItem);
    setItems(updatedItems);
  };

  return (
    <div className="p-5">
      <h2 className="text-3xl font-serif font-[500] capitalize text-center underline text-gray-600">
        Document Manager
      </h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="documents">
          {(provided) => (
            <div
              className="grid gap-4 p-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((doc, index) => (
                <Draggable key={doc.type} draggableId={doc.type} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => setOverlayImage(doc.image)}
                    >
                      <Card doc={doc} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Overlay image={overlayImage} onClose={() => setOverlayImage(null)} />

      {isSaving && (
        <div className="fixed p-3 text-white bg-gray-800 rounded-lg bottom-5 right-5">
          Saving... (Last saved {Math.floor((Date.now() - lastSaveTime) / 1000)}{" "}
          seconds ago)
        </div>
      )}
    </div>
  );
};

export default DocumentCards;

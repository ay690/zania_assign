import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";
import { documents } from "../data/document";

const DocumentCards = () => {
  const [items, setItems] = useState(documents);
  const [overlayImage, setOverlayImage] = useState(null);

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
        {" "}
        document manager
      </h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="documents">
          {(provided) => (
            <div
              className="grid gap-4 p-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items?.map((doc, index) => (
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

      {overlayImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
          onClick={() => setOverlayImage(null)}
        >
          <img
            src={overlayImage}
            alt="Document Preview"
            className="max-w-full max-h-full"
          />
          <button
            className="absolute text-xl text-white top-4 right-4"
            onClick={() => setOverlayImage(null)}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentCards;

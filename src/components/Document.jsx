import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";
import Overlay from "../utils/overlay";
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

      <Overlay image={overlayImage} onClose={() => setOverlayImage(null)} />
    </div>
  );
};

export default DocumentCards;

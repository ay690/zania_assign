const Card = ({ doc, onClick }) => {
  return (
    <div
      className="border rounded-lg shadow-lg cursor-pointer card"
      onClick={onClick}
    >
      <img
        src={doc.image}
        alt={doc.title}
        className="object-cover w-full h-32 rounded-t-lg"
      />
      <h3 className="p-2 font-semibold text-gray-500 text-start">{doc.title}</h3>
    </div>
  );
};

export default Card;

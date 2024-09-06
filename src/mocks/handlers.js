import { http } from "msw";
import { documents as defaultDocuments } from "../data/document";

if (!localStorage.getItem("documents")) {
  localStorage.setItem("documents", JSON.stringify(defaultDocuments));
}

export const handlers = [
  http.post("/api/documents", (req, res, ctx) => {
    console.log("GET /api/documents intercepted");

    const storedDocuments = localStorage.getItem("documents");
    const documentsJSON = storedDocuments
      ? JSON.parse(storedDocuments)
      : defaultDocuments;

    console.log("Sending documents:", documentsJSON);

    return res(ctx.status(200), ctx.json(documentsJSON));
  }),

  http.post("/api/documents", (req, res, ctx) => {
    console.log("POST /api/documents intercepted", req.body);

    const { documents } = req.body;

    localStorage.setItem("documents", JSON.stringify(documents));

    console.log("Documents saved:", documents);

    return res(
      ctx.status(200),
      ctx.json({ message: "Documents saved successfully" })
    );
  }),
];

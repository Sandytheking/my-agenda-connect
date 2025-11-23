
//app/blog/nuevo/page.tsx
"use client";

import { useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

export default function NuevoPost() {
  const editorRef = useRef<EditorJS | null>(null);

  const initEditor = () => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        tools: {
          header: Header,
          list: List,
        },
      });
    }
  };

  // Init Editor.js
  if (typeof window !== "undefined") {
    setTimeout(initEditor, 100);
  }

  const handleSubmit = async () => {
    if (!editorRef.current) return;

    const output = await editorRef.current.save();
    const title = output.blocks[0]?.data?.text || "Sin título";

    const res = await fetch("/api/blog/create", {
      method: "POST",
      body: JSON.stringify({
        title,
        content: output,
      }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Post creado correctamente");
      window.location.href = "/blog";
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>
        Crear nuevo post
      </h1>

      <div
        id="editorjs"
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "6px",
          background: "white",
        }}
      ></div>

      <button
        onClick={handleSubmit}
        style={{
          marginTop: "20px",
          padding: "12px 18px",
          background: "#4C2882",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Publicar post
      </button>
    </div>
  );
}

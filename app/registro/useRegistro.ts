// app/registro/useRegistro.ts
"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useRegistro() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const validPlans = ["free", "pro", "business"];
  const selectedPlan = useMemo(() => {
    const param = searchParams.get("plan") || "";
    return validPlans.includes(param) ? param : "free";
  }, [searchParams]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [slug, setSlug] = useState("");
  const [aceptado, setAceptado] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const [slugStatus, setSlugStatus] = useState<null | "ok" | "error" | "checking">(null);
  const [slugMensaje, setSlugMensaje] = useState("");

  const validarSlug = async () => {
    const limpio = slug.trim().toLowerCase();
    if (!limpio) {
      setSlugStatus(null);
      setSlugMensaje("");
      return;
    }

    setSlugStatus("checking");
    setSlugMensaje("Verificando...");

    try {
      const res = await fetch(`https://api.agenda-connect.com/api/slug-exists/${limpio}`);
      const data = await res.json();

      if (data.exists) {
        setSlugStatus("error");
        setSlugMensaje(`⛔ “${limpio}” ya está en uso`);
      } else {
        setSlugStatus("ok");
        setSlugMensaje(`✅ “${limpio}” está disponible`);
      }
    } catch (error) {
      setSlugStatus("error");
      setSlugMensaje("⛔ Error al verificar el slug.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !nombre || !slug) {
      setMensaje("⚠️ Todos los campos son obligatorios");
      return;
    }

    if (!aceptado) {
      setMensaje("Debes aceptar los Términos y Condiciones.");
      return;
    }

    setCargando(true);
    setMensaje("Creando cuenta...");

    try {
      const res = await fetch("https://api.agenda-connect.com/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          nombre,
          slug,
          plan: selectedPlan,
          accepted_terms: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setMensaje("⚠️ El slug ya está en uso. Elige otro.");
        } else if (data?.error) {
          setMensaje(`⚠️ ${data.error}`);
        } else {
          setMensaje("❌ Error desconocido al registrar");
        }
      } else {
        setMensaje("✅ Registro exitoso. Redirigiendo...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Error en registro:", error);
      setMensaje("❌ Error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  const botonDeshabilitado = slugStatus !== "ok" || !aceptado;

  return {
    email,
    setEmail,
    password,
    setPassword,
    nombre,
    setNombre,
    slug,
    setSlug,
    aceptado,
    setAceptado,
    mensaje,
    cargando,
    slugStatus,
    slugMensaje,
    validarSlug,
    handleSubmit,
    botonDeshabilitado,
  };
}

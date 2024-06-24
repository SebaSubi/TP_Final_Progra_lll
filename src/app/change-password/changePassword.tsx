"use client";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";
import { useSearchParams } from "next/navigation";
import EmailTemplate from "@/components/EmailTemplate"; // adjust this import path to match your project structure
import { Form, Input, SubmitButton } from "../components/Form"; // ajusta esta ruta de importación para que coincida con la estructura de tu proyecto
import { FormEvent, Suspense } from "react";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
  const { finishLoading, isLoading, startLoading } = useLoading();
  const searchParams = useSearchParams();
  const authFetch = useAuthFetch();
  const router = useRouter();

  const handleForgetChangedClick = () => {
    router.push("/");
  };

  const changePassword = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    startLoading();
    const formData = new FormData(e.target as HTMLFormElement);

    const token = searchParams.get("token");

    const headers = {
      token,
    };

    await authFetch({
      endpoint: "/api/auth/change-password",
      redirectRoute: "/",
      formData: {
        newPassword: formData.get("newPassword"),
        confirmPassword: formData.get("confirmPassword"),
      },
      headers,
    });

    finishLoading();
  };

  return (
    <>
      <main className="container mx-auto flex flex-col justify-center items-center min-h-screen bg-black">
        <img
          src="/p11chad.svg"
          alt="p11"
          className="mb-5"
          style={{ width: "15%", height: "auto" }}
        />
        <Form onSubmit={changePassword}>
          <div className="w-full p-2 bg-white mb-4 text-black border border-white rounded-lg font-bold uppercase duration-200 ">
            <Input
              placeholder="Ingresa tu nueva contraseña:"
              label="Nueva Contraseña"
              name="newPassword"
              type="password"
            />
            <Input
              placeholder="Repite tu nueva contraseña"
              label="Confirmar Nueva Contraseña"
              name="confirmPassword"
              type="password"
            />
          </div>
          <EmailTemplate buttonUrl="/change-password" />
          <button
            type="button"
            onClick={handleForgetChangedClick}
            className="w-full p-2 bg-white mb-4 text-black border border-white rounded-lg font-bold uppercase duration-200 hover:bg-gray-300 mt-4"
          >
            Back to login
          </button>
        </Form>
      </main>
    </>
  );
}

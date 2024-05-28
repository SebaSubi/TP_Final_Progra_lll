
"use client"
import { useAuthFetch } from '@/hooks/useAuthFetch';
import { useLoading } from '@/hooks/useLoading';
import { useSearchParams } from 'next/navigation';
import EmailTemplate from '@/components/EmailTemplate'; // adjust this import path to match your project structure
import { Form, Input, SubmitButton } from '../components/Form'; // ajusta esta ruta de importación para que coincida con la estructura de tu proyecto
import { FormEvent } from 'react';

export default function ChangePasswordPage() {
  const { finishLoading, isLoading, startLoading } = useLoading();
  const searchParams = useSearchParams();
  const authFetch = useAuthFetch();
  
  const changePassword = async (e: FormEvent<HTMLFormElement>) => {
    console.log('changePassword');
    
    e.preventDefault()
    startLoading();
    const formData = new FormData(e.target as HTMLFormElement)

    const token = searchParams.get('token');

    const headers = {
      token,
    };

    await authFetch({
      endpoint: '/api/auth/change-password',
      redirectRoute: '/',
      formData: { currentPassword: formData.get('currentPassword'), newPassword: formData.get('newPassword'), confirmPassword: formData.get('confirmPassword')},
      headers,
    });

    finishLoading();
  };
  
  return (
    <>
      <EmailTemplate buttonUrl="/change-password" />
      <Form onSubmit={changePassword}>
      <div className="my-[10px] flex flex-col gap-4">
        <Input
          placeholder="Ingresa tu contraseña actual..."
          label="Contraseña Actual"
          name="currentPassword"
          type="password"
        />
        <Input
          placeholder="Ingresa tu nueva contraseña..."
          label="Nueva Contraseña"
          name="newPassword"
          type="password"
        />
        <Input
          placeholder="Repite tu nueva contraseña..."
          label="Confirmar Nueva Contraseña"
          name="confirmPassword"
          type="password"
        />
      </div>
      <SubmitButton buttonText="Cambiar Contraseña" isLoading={isLoading} />
    </Form>
    </>
  );
}
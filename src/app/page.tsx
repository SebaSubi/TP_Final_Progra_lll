'use client'

import LoginPage from "./login/page";
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/register');
  }

  return (
    <main className="container mx-auto flex flex-col justify-center items-center min-h-screen bg-black">
      <img src="/p11chad.svg" alt="p11" style={{ width: '15%', height: 'auto' }}/>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '100%', margin: '0 auto' }}>
        <img src="/barbarianKingDef.svg" style={{ maxWidth: '35%', height: 'auto'}} alt="Barbarian King" />
          <div className="flex justify-center items-center space-x-20 mt-20" style={{ width: '100%', maxWidth: '100%', height:'70%', maxHeight: '70%' }}>
            <LoginPage />
          </div>
        <img src="/newQueenArcher.svg" style={{ maxWidth: '30%', height: 'auto', marginLeft: 60 }} alt="Queen Archer" />
      </div>
      <p className="text-2xl text-center text-white">
        ¿Don't have an account? <a href="/register" onClick={handleRegisterClick} className="underline hover:text-red-900">Sign Up</a>
      </p>
    </main>
  );
}
'use client'

import LoginPage from "./login/page";

export default function Home() {
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
    </main>
  );
}
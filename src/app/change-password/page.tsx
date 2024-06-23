"use client";
import { Suspense } from "react";
import ChangePassword from "./changePassword";

export default function PswChangePage() {
  return (
    <Suspense>
      <ChangePassword />
    </Suspense>
  );
}

import { useState } from "react";

export default function Place({
  occupied,
  text,
}: {
  occupied: boolean;
  text: string;
}) {
  const [available, setAvailable] = useState(true);
  return (
    <div
      className={`h-10 w-10 ${
        available ? "bg-green-600" : "bg-blue-500"
      } flex items-center justify-center`}
      onClick={() => setAvailable(!available)}
    >
      {text}
    </div>
  );
}

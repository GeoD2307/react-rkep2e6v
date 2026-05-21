import { useState } from "react";

export default function useTimeout() {
  const [isActive, setIsActive] = useState(false);

  // Funcția care activează starea și pornește cronometrul
  function handleTimeout() {
    setIsActive(true);

    // Oprește starea după expirarea timpului
    setTimeout(() => {
      setIsActive(false);
    }, 2000);
  }

  // Returnăm starea și funcția de declanșare
  return [isActive, handleTimeout];
}
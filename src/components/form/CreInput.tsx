import { IoHelpCircleOutline } from "react-icons/io5";
import { useState } from "react";

export default function CreInput({
  onInputChange,
  creValue,
}: Readonly<{
  onInputChange: (key: string, inputValue: string) => void;
  creValue: number;
}>) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-between gap-2 mx-2 relative">
        <h3 className="text-xs mb-2 line-clamp-2">CRE atual (opcional)</h3>
        <IoHelpCircleOutline
          className="hover:cursor-pointer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        />
        {showTooltip && (
          <p className="text-neutral-300 top-4 text-xs absolute border border-neutral-700 p-2 rounded bg-neutral-800/75 backdrop-blur">
            <em>
              Para obter o CRE geral é necessário informar o valor atual do CRE.
              Sem isso o cálculo será apenas do período.
            </em>
          </p>
        )}
      </div>
      <input
        type="number"
        id="previous-cre"
        step="any"
        title="CRE atual (opcional)"
        value={creValue}
        className="w-full text-sm focus:outline-none border focus:border-neutral-500 border-neutral-700 py-1 px-3 bg-neutral-800 rounded-lg"
        onChange={(e) => onInputChange("prevCre", e.target.value)}
      />
    </>
  );
}

import { useState } from "react";
import Image from "next/image";

export type CategoryValue = "international" | "societe" | "culture" | "politic";

interface Category {
  value: CategoryValue;
  label: string;
  color: string;
  colorIsNoSelected: string;
  colorCircle: string;
  icon: string;
}

interface CustomCategorySelectProps {
  value: CategoryValue;
  onChange: (value: CategoryValue) => void;
}

export function CustomCategorySelect({ value, onChange }: CustomCategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const categories: Category[] = [
    { value: "international", label: "International", color: "text-[#7C2908] bg-[#FFDFD2]", colorIsNoSelected: "border-2 border-[#7C2908] text-[#7C2908] bg-[#F3DEDE]", colorCircle: "bg-[#7C2908]", icon: "arrow_drop_down_international" },
    { value: "societe", label: "Société", color: "text-[#5E4007] bg-[#FFE1AA]", colorIsNoSelected: "border-2 border-[#5E4007] text-[#5E4007] bg-[#F3DEDE]", colorCircle: "bg-[#5E4007]", icon: "arrow_drop_down_societe" },
    { value: "culture", label: "Culture", color: "text-[#153A03] bg-[#C5FFA9]", colorIsNoSelected: "border-2 border-[#153A03] text-[#153A03] bg-[#F3DEDE]", colorCircle: "bg-[#153A03]", icon: "arrow_drop_down_culture" },
    { value: "politic", label: "Politique", color: "text-[#071652] bg-[#C8D3FF]", colorIsNoSelected: "border-2 border-[#071652] text-[#071652] bg-[#F3DEDE]", colorCircle: "bg-[#071652]", icon: "arrow_drop_down_politique" }
  ];

  const selectedCategory = categories.find(cat => cat.value === value) || categories[0];

  return (
    <div className="relative">
      {/* Élément sélectionné */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer p-2 rounded-full w-1/4 flex items-center gap-2 ${selectedCategory.color} font-bold`}
      >
        <div className={`rounded-full w-3 h-3 ${selectedCategory.colorCircle}`}></div>
        {selectedCategory.label}
        <Image
          src={`/icons/${selectedCategory.icon}.svg`}
          alt="arrow"
          width={32}
          height={32}
          className="object-contain ml-auto"
        />  
      </div>

      {/* Liste déroulante */}
      {isOpen && (
        <div className="absolute top-full bg-[#F3DEDE] dark:bg-[#433D3D] w-1/4 p-2 left-0 mt-1 rounded-xl overflow-hidden z-50">
          <div className="flex flex-col gap-2">
            {categories.map(category => (
              <div
                key={category.value}
                onClick={() => {
                  onChange(category.value as CategoryValue);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-2 p-2 cursor-pointer hover:opacity-80 ${category.value === value
                  ? `${category.color} font-bold rounded-full` // Style pour l'option sélectionnée
                  : `${category.colorIsNoSelected} font-bold rounded-full` // Style pour les options non sélectionnées
                  }`}
              >
                <div className={`rounded-full w-3 h-3 ${category.colorCircle}`}></div>
                {category.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
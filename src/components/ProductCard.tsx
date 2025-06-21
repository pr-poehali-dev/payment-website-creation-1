import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  onSelect: (product: { id: string; name: string; price: number }) => void;
}

const ProductCard = ({
  id,
  name,
  price,
  description,
  image,
  onSelect,
}: ProductCardProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected(true);
    onSelect({ id, name, price });
  };

  return (
    <div
      className={`payment-card animate-fade-in ${isSelected ? "border-payment-orange" : ""}`}
    >
      <div className="flex flex-col h-full">
        {image && (
          <div className="w-full h-48 bg-payment-gray-dark rounded-lg mb-4 flex items-center justify-center">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}

        <div className="flex-1">
          <h3 className="text-xl font-montserrat font-semibold mb-2 text-white">
            {name}
          </h3>
          <p className="text-gray-400 mb-4 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-montserrat font-bold text-payment-orange">
            {price.toLocaleString("ru-RU")} ₽
          </div>
          <Button
            onClick={handleSelect}
            className={`payment-button ${isSelected ? "bg-payment-orange hover:bg-orange-600" : ""}`}
            disabled={isSelected}
          >
            {isSelected ? (
              <>
                <Icon name="Check" size={16} className="mr-2" />
                Выбрано
              </>
            ) : (
              "Выбрать"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Product } from "@/types/product";

interface ProductCardProps extends Product {
  onSelect: (product: Product) => void;
}

const ProductCard = ({
  id,
  name,
  price,
  description,
  image,
  type,
  deliveryConfig,
  onSelect,
}: ProductCardProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected(true);
    onSelect({ id, name, price, description, image, type, deliveryConfig });
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
          <div className="flex items-center mb-2">
            <h3 className="text-xl font-montserrat font-semibold text-white mr-2">
              {name}
            </h3>
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                type === "digital"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-blue-500/20 text-blue-400"
              }`}
            >
              {type === "digital" ? "Цифровой" : "Физический"}
            </div>
          </div>
          <p className="text-gray-400 mb-4 text-sm leading-relaxed">
            {description}
          </p>
          {type === "digital" && (
            <div className="flex items-center text-xs text-green-400 mb-3">
              <Icon name="Zap" size={12} className="mr-1" />
              Мгновенная автоматическая выдача
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-montserrat font-bold text-payment-orange"></div>
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

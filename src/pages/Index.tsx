import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import PaymentForm from "@/components/PaymentForm";
import PaymentLink from "@/components/PaymentLink";
import Icon from "@/components/ui/icon";

// Примеры товаров
const PRODUCTS = [
  {
    id: "1",
    name: "Премиум подписка",
    price: 2999,
    description:
      "Получите доступ ко всем премиум функциям на год. Без рекламы, приоритетная поддержка.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    name: "Базовый план",
    price: 999,
    description:
      "Стандартный набор функций для ежедневного использования. Отличный выбор для начинающих.",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    name: "Корпоративный пакет",
    price: 9999,
    description:
      "Решение для бизнеса с расширенными возможностями и персональной поддержкой.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
  },
];

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    name: string;
    price: number;
  } | null>(null);
  const [paymentLink, setPaymentLink] = useState<string>("");

  const handleProductSelect = (product: {
    id: string;
    name: string;
    price: number;
  }) => {
    setSelectedProduct(product);
    setPaymentLink(""); // Сбрасываем ссылку при выборе нового товара
  };

  const handlePaymentSuccess = (link: string) => {
    setPaymentLink(link);
  };

  const handleReset = () => {
    setSelectedProduct(null);
    setPaymentLink("");
  };

  return (
    <div className="min-h-screen bg-payment-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-payment-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-payment-red rounded-lg flex items-center justify-center mr-3">
                <Icon name="Zap" size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-montserrat font-bold text-white">
                PaymentPro
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">Powered by Tinkoff</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-white mb-4">
            Быстрая оплата
            <span className="text-payment-orange"> Тинькофф</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Создавайте ссылки на оплату за секунды. Безопасно, надёжно, просто.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Products */}
          <div>
            <div className="flex items-center mb-6">
              <Icon
                name="ShoppingBag"
                size={24}
                className="mr-3 text-payment-orange"
              />
              <h3 className="text-2xl font-montserrat font-bold text-white">
                Выберите товар
              </h3>
            </div>

            <div className="grid gap-4">
              {PRODUCTS.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onSelect={handleProductSelect}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Payment */}
          <div>
            {!paymentLink ? (
              <PaymentForm
                selectedProduct={selectedProduct}
                onPaymentSuccess={handlePaymentSuccess}
              />
            ) : (
              <PaymentLink
                paymentLink={paymentLink}
                selectedProduct={selectedProduct!}
                onReset={handleReset}
              />
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 pt-16 border-t border-gray-800">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-montserrat font-bold text-white mb-4">
              Почему выбирают нас
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-payment-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={24} className="text-white" />
              </div>
              <h4 className="font-montserrat font-semibold text-white mb-2">
                Безопасность
              </h4>
              <p className="text-gray-400 text-sm">
                Защищённые платежи через банк Тинькофф
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-payment-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Zap" size={24} className="text-white" />
              </div>
              <h4 className="font-montserrat font-semibold text-white mb-2">
                Скорость
              </h4>
              <p className="text-gray-400 text-sm">
                Создание ссылки на оплату за секунды
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-payment-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Smartphone" size={24} className="text-white" />
              </div>
              <h4 className="font-montserrat font-semibold text-white mb-2">
                Удобство
              </h4>
              <p className="text-gray-400 text-sm">
                Работает на всех устройствах
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

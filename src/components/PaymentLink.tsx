import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

interface PaymentLinkProps {
  paymentLink: string;
  selectedProduct: {
    id: string;
    name: string;
    price: number;
  };
  onReset: () => void;
}

const PaymentLink = ({
  paymentLink,
  selectedProduct,
  onReset,
}: PaymentLinkProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(paymentLink);
      setCopied(true);
      toast({
        title: "Скопировано",
        description: "Ссылка на оплату скопирована в буфер обмена",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать ссылку",
        variant: "destructive",
      });
    }
  };

  const openPayment = () => {
    window.open(paymentLink, "_blank");
  };

  return (
    <div className="payment-card animate-scale-in">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-payment-orange rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-montserrat font-bold text-white mb-2">
          Платёж создан
        </h2>
        <p className="text-gray-400">
          Ссылка на оплату товара "{selectedProduct.name}" готова
        </p>
      </div>

      <div className="bg-payment-gray-dark/50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-montserrat font-semibold">
            {selectedProduct.name}
          </span>
          <span className="text-payment-orange font-montserrat font-bold">
            {selectedProduct.price.toLocaleString("ru-RU")} ₽
          </span>
        </div>
        <div className="text-sm text-gray-400">
          Статус: <span className="text-payment-orange">Ожидает оплаты</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Ссылка на оплату
          </label>
          <div className="flex gap-2">
            <Input
              value={paymentLink}
              readOnly
              className="payment-input flex-1 text-sm"
            />
            <Button
              onClick={copyToClipboard}
              className={`px-4 ${copied ? "bg-payment-orange hover:bg-orange-600" : "bg-payment-gray-dark hover:bg-gray-600"} border border-gray-700`}
            >
              <Icon name={copied ? "Check" : "Copy"} size={16} />
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={openPayment} className="flex-1 payment-button">
            <Icon name="ExternalLink" size={16} className="mr-2" />
            Открыть оплату
          </Button>
          <Button
            onClick={onReset}
            variant="outline"
            className="flex-1 border-gray-700 text-white hover:bg-payment-gray-dark"
          >
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Создать новый
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentLink;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { DeliveryResult } from "@/types/product";

interface DeliveryResultProps {
  result: DeliveryResult;
  productName: string;
  onClose: () => void;
}

const DeliveryResultComponent = ({
  result,
  productName,
  onClose,
}: DeliveryResultProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!result.success) {
    return (
      <div className="payment-card animate-scale-in">
        <div className="text-center py-8">
          <Icon
            name="AlertCircle"
            size={48}
            className="mx-auto mb-4 text-red-500"
          />
          <h3 className="text-xl font-montserrat font-semibold mb-2 text-white">
            Ошибка выдачи товара
          </h3>
          <p className="text-gray-400 mb-6">
            Произошла ошибка при автоматической выдаче товара. Свяжитесь с
            поддержкой.
          </p>
          <Button onClick={onClose} className="payment-button">
            Понятно
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-card animate-scale-in">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-montserrat font-bold text-white mb-2">
          Товар выдан автоматически!
        </h2>
        <p className="text-gray-400">{productName} успешно доставлен</p>
      </div>

      <div className="space-y-4">
        {result.downloadLink && (
          <div className="bg-payment-gray-dark/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-white">
                Ссылка для скачивания
              </label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(result.downloadLink!)}
                className="text-payment-orange hover:text-orange-400"
              >
                <Icon name={copied ? "Check" : "Copy"} size={16} />
              </Button>
            </div>
            <div className="bg-payment-black/50 rounded p-2 text-sm text-gray-300 break-all">
              {result.downloadLink}
            </div>
          </div>
        )}

        {result.licenseKey && (
          <div className="bg-payment-gray-dark/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-white">
                Лицензионный ключ
              </label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(result.licenseKey!)}
                className="text-payment-orange hover:text-orange-400"
              >
                <Icon name={copied ? "Check" : "Copy"} size={16} />
              </Button>
            </div>
            <div className="bg-payment-black/50 rounded p-2 text-center font-mono text-lg text-payment-orange">
              {result.licenseKey}
            </div>
          </div>
        )}

        {result.instructions && (
          <div className="bg-payment-gray-dark/50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-white mb-2">Инструкции</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {result.instructions}
            </p>
          </div>
        )}

        {result.expiresAt && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
            <div className="flex items-center">
              <Icon name="Clock" size={16} className="text-yellow-500 mr-2" />
              <span className="text-sm text-yellow-200">
                Ссылка действительна до:{" "}
                {result.expiresAt.toLocaleDateString("ru-RU")}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500 text-center mb-4">
          Данные также отправлены на ваш email
        </p>
        <Button onClick={onClose} className="w-full payment-button">
          <Icon name="Home" size={16} className="mr-2" />
          Вернуться к покупкам
        </Button>
      </div>
    </div>
  );
};

export default DeliveryResultComponent;

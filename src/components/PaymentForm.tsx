import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email("Введите корректный email"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  name: z.string().min(2, "Введите имя"),
});

interface PaymentFormProps {
  selectedProduct: {
    id: string;
    name: string;
    price: number;
  } | null;
  onPaymentSuccess: (paymentLink: string) => void;
}

const PaymentForm = ({
  selectedProduct,
  onPaymentSuccess,
}: PaymentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!selectedProduct) return;

    setIsLoading(true);

    try {
      // Здесь должна быть интеграция с API Тинькофф
      // Пока что имитируем создание платежа
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockPaymentLink = `https://securepayments.tinkoff.ru/pay/form/${Math.random().toString(36).substring(7)}`;

      onPaymentSuccess(mockPaymentLink);

      toast({
        title: "Платёж создан",
        description: "Ссылка на оплату успешно сгенерирована",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать платёж. Попробуйте снова.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedProduct) {
    return (
      <div className="text-center py-12">
        <Icon
          name="CreditCard"
          size={48}
          className="mx-auto mb-4 text-gray-600"
        />
        <h3 className="text-xl font-montserrat font-semibold mb-2 text-gray-400">
          Выберите товар
        </h3>
        <p className="text-gray-500">
          Для оформления платежа сначала выберите товар из списка выше
        </p>
      </div>
    );
  }

  return (
    <div className="payment-card animate-scale-in">
      <div className="flex items-center mb-6">
        <Icon
          name="CreditCard"
          size={24}
          className="mr-3 text-payment-orange"
        />
        <h2 className="text-2xl font-montserrat font-bold text-white">
          Оформление платежа
        </h2>
      </div>

      <div className="bg-payment-gray-dark/50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-montserrat font-semibold text-white">
              {selectedProduct.name}
            </h3>
            <p className="text-gray-400 text-sm">К оплате</p>
          </div>
          <div className="text-2xl font-montserrat font-bold text-payment-orange">
            {selectedProduct.price.toLocaleString("ru-RU")} ₽
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Имя</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="payment-input"
                    placeholder="Введите ваше имя"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="payment-input"
                    placeholder="example@mail.ru"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Телефон</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    className="payment-input"
                    placeholder="+7 (999) 123-45-67"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full payment-button text-lg py-4 mt-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                Создаём платёж...
              </>
            ) : (
              <>
                <Icon name="Zap" size={20} className="mr-2" />
                Создать платёж
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PaymentForm;

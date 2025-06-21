import { Product, DeliveryResult } from "@/types/product";

class DeliveryService {
  // Генерация лицензионного ключа
  private generateLicenseKey(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const segments = 4;
    const segmentLength = 4;

    const key = Array.from({ length: segments }, () =>
      Array.from({ length: segmentLength }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length)),
      ).join(""),
    ).join("-");

    return key;
  }

  // Генерация защищённой ссылки для скачивания
  private generateDownloadLink(productId: string): string {
    const token = Math.random().toString(36).substring(2, 15);
    const expires = Date.now() + 24 * 60 * 60 * 1000; // 24 часа
    return `https://secure-downloads.example.com/download/${productId}?token=${token}&expires=${expires}`;
  }

  // Автоматическая выдача товара
  async deliverProduct(
    product: Product,
    customerEmail: string,
  ): Promise<DeliveryResult> {
    try {
      if (product.type === "physical") {
        return {
          success: true,
          instructions:
            "Ваш заказ принят в обработку. Товар будет отправлен в течение 2-3 рабочих дней.",
        };
      }

      // Для цифровых товаров
      const licenseKey = this.generateLicenseKey();
      const downloadLink = this.generateDownloadLink(product.id);
      const expiresAt = new Date(
        Date.now() +
          (product.deliveryConfig?.validityDays || 30) * 24 * 60 * 60 * 1000,
      );

      // Имитация отправки email с товаром
      await this.sendDeliveryEmail(customerEmail, {
        productName: product.name,
        downloadLink,
        licenseKey,
        instructions:
          product.deliveryConfig?.instructions ||
          "Спасибо за покупку! Ваши данные для доступа:",
      });

      return {
        success: true,
        downloadLink,
        licenseKey,
        instructions: product.deliveryConfig?.instructions,
        expiresAt,
      };
    } catch (error) {
      console.error("Ошибка при выдаче товара:", error);
      return {
        success: false,
      };
    }
  }

  // Отправка email с товаром
  private async sendDeliveryEmail(
    email: string,
    data: {
      productName: string;
      downloadLink: string;
      licenseKey: string;
      instructions: string;
    },
  ): Promise<void> {
    // Имитация отправки email
    console.log(`Отправка товара на ${email}:`, data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

export default new DeliveryService();

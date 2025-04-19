
import { Stripe } from "https://esm.sh/stripe@14.21.0";
import { logStep, compressFeatures } from "./utils.ts";

export const updatePlan = async (stripe: Stripe, productId: string, productData: any) => {
  try {
    // Compress features to fit in metadata limits
    const compressedFeatures = compressFeatures(productData.features || []);
    
    // Update the product
    const product = await stripe.products.update(productId, {
      name: productData.name,
      description: productData.description || '',
      active: productData.isActive,
      metadata: {
        features: compressedFeatures,
        default: productData.isDefault ? 'true' : 'false',
      },
    });
    
    // Update price if needed
    if (productData.priceId) {
      try {
        const currentPrice = await stripe.prices.retrieve(productData.priceId);
        if (currentPrice.unit_amount !== Math.round(productData.price * 100)) {
          // Create a new price
          const newPrice = await stripe.prices.create({
            unit_amount: Math.round(productData.price * 100),
            currency: 'brl',
            product: productId,
            recurring: { interval: 'month' },
          });
          
          // Update the product with the new default price
          await stripe.products.update(productId, {
            default_price: newPrice.id,
          });
          
          // Mark old price as inactive
          await stripe.prices.update(productData.priceId, { active: false });
          
          // Update priceId in productData
          productData.priceId = newPrice.id;
        }
      } catch (priceError) {
        logStep(`WARNING: Price update failed - ${priceError instanceof Error ? priceError.message : String(priceError)}`);
      }
    }
    
    logStep("Product updated", { productId });
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: productData.price,
      priceId: productData.priceId,
      isActive: product.active,
      features: productData.features || [],
      isDefault: productData.isDefault,
    };
  } catch (error) {
    logStep(`ERROR: Failed to update product - ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};

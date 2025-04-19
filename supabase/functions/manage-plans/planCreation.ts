
import { Stripe } from "https://esm.sh/stripe@14.21.0";
import { logStep, compressFeatures } from "./utils.ts";

export const createPlan = async (stripe: Stripe, productData: any) => {
  try {
    // Compress features data to fit in metadata
    const compressedFeatures = compressFeatures(productData.features || []);
    
    // Create a new product
    const product = await stripe.products.create({
      name: productData.name,
      description: productData.description || '',
      active: productData.isActive,
      metadata: {
        features: compressedFeatures,
        default: productData.isDefault ? 'true' : 'false',
      },
    });
    
    // Create a price for the product
    const priceObj = await stripe.prices.create({
      unit_amount: Math.round(productData.price * 100), // Convert to cents
      currency: 'brl',
      product: product.id,
      recurring: { interval: 'month' },
    });
    
    // Update the product with the default price
    await stripe.products.update(product.id, {
      default_price: priceObj.id,
    });
    
    logStep("Product created", { productId: product.id, priceId: priceObj.id });
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: productData.price,
      priceId: priceObj.id,
      isActive: product.active,
      features: productData.features || [],
      isDefault: productData.isDefault,
    };
  } catch (error) {
    logStep(`ERROR: Failed to create product - ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};

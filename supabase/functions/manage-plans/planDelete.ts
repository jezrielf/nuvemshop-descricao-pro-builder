
import { Stripe } from "https://esm.sh/stripe@14.21.0";
import { logStep } from "./utils.ts";

export const deletePlan = async (stripe: Stripe, productId: string) => {
  try {
    // Check if product is set as default
    const product = await stripe.products.retrieve(productId);
    if (product.metadata.default === 'true') {
      logStep("ERROR: Cannot delete default product");
      throw new Error("Cannot delete default product. Set another product as default first.");
    }
    
    // Archive the product instead of deleting (Stripe recommended approach)
    await stripe.products.update(productId, {
      active: false,
    });
    
    logStep("Product archived", { productId });
    return { success: true };
  } catch (error) {
    logStep(`ERROR: Failed to delete product - ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};

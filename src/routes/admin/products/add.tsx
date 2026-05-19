import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProductForm, ProductFormValues } from "@/components/admin/ProductForm";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/products/add")({
  component: AddProduct,
});

function AddProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: ProductFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.from("products").insert([
        {
          name: data.name,
          description: data.description,
          category: data.category,
          price: data.price || null,
          offer_percentage: data.offer_percentage || null,
          in_stock: data.in_stock,
          image_url: data.image_url,
        },
      ]);

      if (error) throw error;

      toast.success("Product added successfully");
      navigate({ to: "/admin/products" });
    } catch (error: any) {
      toast.error(error.message || "Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link to="/admin/products">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Add Product</h2>
          <p className="text-muted-foreground">
            Create a new product for your store.
          </p>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <ProductForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}

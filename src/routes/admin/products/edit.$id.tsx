import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { ProductForm, ProductFormValues } from "@/components/admin/ProductForm";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/products/edit/$id")({
  component: EditProduct,
});

function EditProduct() {
  const { id } = Route.useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [initialData, setInitialData] = useState<ProductFormValues | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast.error("Failed to fetch product details");
        navigate({ to: "/admin/products" });
      } else if (data) {
        setInitialData({
          name: data.name,
          description: data.description || "",
          category: data.category,
          price: data.price,
          offer_percentage: data.offer_percentage,
          in_stock: data.in_stock,
          image_url: data.image_url,
        });
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);

  const handleSubmit = async (data: ProductFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("products")
        .update({
          name: data.name,
          description: data.description,
          category: data.category,
          price: data.price || null,
          offer_percentage: data.offer_percentage || null,
          in_stock: data.in_stock,
          image_url: data.image_url,
        })
        .eq("id", id);

      if (error) throw error;

      toast.success("Product updated successfully");
      navigate({ to: "/admin/products" });
    } catch (error: any) {
      toast.error(error.message || "Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };

  if (!initialData) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link to="/admin/products">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Product</h2>
          <p className="text-muted-foreground">
            Update the details of your product.
          </p>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <ProductForm 
          initialData={initialData} 
          onSubmit={handleSubmit} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
}

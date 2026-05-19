import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Loader2, Tag, CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/products/$id")({
  component: ProductDetailsPage,
});

function ProductDetailsPage() {
  const { id } = Route.useParams();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setProduct(data);
      }
      setLoading(false);
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-forest" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-forest-deep mb-2">Product Not Found</h2>
        <p className="text-muted-foreground mb-6">The product you are looking for does not exist.</p>
        <Link to="/products" search={{ category: "all" }}>
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  const whatsappNumber = "+971582082900";
  const whatsappMessage = encodeURIComponent(
    `Hello, I would like to order: ${product.name}`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <Link to="/products" search={{ category: "all" }}>
          <Button variant="ghost" className="mb-6 -ml-4 hover:bg-forest/10 text-forest-deep">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-gray-900/5">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Section */}
            <div className="relative aspect-square md:aspect-auto md:h-full bg-gray-100 p-8 flex items-center justify-center">
              {product.offer_percentage && (
                <div className="absolute top-6 left-6 rounded-full bg-red-500 px-4 py-1 text-sm font-bold tracking-wide text-white shadow-md z-10 flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  {product.offer_percentage}% OFF
                </div>
              )}
              <img
                src={product.image_url}
                alt={product.name}
                className="max-h-full w-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Details Section */}
            <div className="flex flex-col p-8 md:p-12">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-forest">
                  {product.category}
                </span>
                {product.in_stock ? (
                  <span className="flex items-center text-sm font-semibold text-green-600">
                    <CheckCircle2 className="mr-1.5 h-4 w-4" /> In Stock
                  </span>
                ) : (
                  <span className="flex items-center text-sm font-semibold text-red-600">
                    <XCircle className="mr-1.5 h-4 w-4" /> Out of Stock
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl font-extrabold tracking-tight text-forest-deep sm:text-4xl mb-4">
                {product.name}
              </h1>

              {product.price && (
                <div className="mb-6 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">
                    {product.price} QAR
                  </span>
                  {product.offer_percentage && (
                    <span className="text-lg font-medium text-muted-foreground line-through decoration-red-500 decoration-2">
                      {((product.price * 100) / (100 - product.offer_percentage)).toFixed(2)} QAR
                    </span>
                  )}
                </div>
              )}

              {product.description && (
                <div className="prose prose-sm sm:prose-base text-gray-600 mb-8 flex-1">
                  <p>{product.description}</p>
                </div>
              )}

              <div className="mt-auto pt-8 border-t border-gray-100">
                <Button
                  size="lg"
                  className="w-full h-14 text-lg font-bold shadow-lg shadow-[#25D366]/20 bg-[#25D366] hover:bg-[#20bd5a] text-white transition-all hover:scale-[1.02]"
                  disabled={!product.in_stock}
                  asChild={product.in_stock}
                >
                  {product.in_stock ? (
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-6 w-6" />
                      Order via WhatsApp
                    </a>
                  ) : (
                    <span>Currently Unavailable</span>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-4 font-medium">
                  Clicking this button will open WhatsApp with a pre-filled order message.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

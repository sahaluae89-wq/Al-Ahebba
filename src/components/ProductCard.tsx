import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number | null;
    offer_percentage: number | null;
    image_url: string;
    in_stock: boolean;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const whatsappNumber = "+971582082900";
  const whatsappMessage = encodeURIComponent(
    `Hello, I would like to order: ${product.name}`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="group relative flex flex-col rounded-2xl border-2 border-forest/15 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-forest hover:shadow-xl overflow-hidden">
      <Link to="/products/$id" params={{ id: product.id }} className="flex-1">
        <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
          <img
            src={optimizeCloudinaryUrl(product.image_url, 400)}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
          
          {/* Offer Badge */}
          {product.offer_percentage && (
            <div className="absolute top-2 left-2 rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
              {product.offer_percentage}% OFF
            </div>
          )}

          {/* Out of Stock Badge */}
          {!product.in_stock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="rounded-md bg-white/90 px-3 py-1 font-bold text-gray-900 shadow-sm">
                Out of Stock
              </span>
            </div>
          )}

          {/* Hover Description Overlay */}
          {product.description && (
            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/70 p-3 text-sm text-white transition-transform duration-300 group-hover:translate-y-0">
              <p className="line-clamp-3">{product.description}</p>
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-display font-bold text-forest-deep line-clamp-2">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            {product.price ? (
              <span className="font-bold text-lg text-primary">
                {product.price} AED
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">Price on request</span>
            )}
          </div>
        </div>
      </Link>

      <div className="p-4 pt-0">
        <Button
          className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white"
          disabled={!product.in_stock}
          asChild={product.in_stock}
        >
          {product.in_stock ? (
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full">
              <MessageCircle className="mr-2 h-4 w-4 shrink-0" />
              <span className="truncate">
                <span className="hidden sm:inline">Order via </span>WhatsApp
              </span>
            </a>
          ) : (
            <span>Out of Stock</span>
          )}
        </Button>
      </div>
    </div>
  );
}

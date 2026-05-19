import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2, Home, ShoppingCart } from "lucide-react";
import { categories } from "@/lib/categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/lib/i18n";

// Validate search parameters (category)
export const Route = createFileRoute("/products/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      category: (search.category as string) || "all",
    };
  },
  component: ProductsPage,
});

function ProductsPage() {
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const { tr, lang } = useI18n();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedCategory = searchParams.category;

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      let query = supabase.from("products").select("*").order("created_at", { ascending: false });

      if (selectedCategory !== "all") {
        query = query.eq("category", selectedCategory);
      }

      const { data, error } = await query;
      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    }

    fetchProducts();
  }, [selectedCategory]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryChange = (val: string) => {
    navigate({ search: { category: val } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-4">
          <Link to="/">
            <Button variant="ghost" className="hover:bg-forest/10 text-forest-deep -ml-4">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
        </div>
        <div className="mb-8">
          <h1 className="font-display text-4xl font-extrabold text-forest-deep">
            {tr("categoriesTitle")}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse our fresh selection of daily essentials.
          </p>
        </div>

        <div className="mb-8 flex flex-row gap-2 sm:gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={tr("searchPh")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-full border-2 border-forest/20 focus-visible:ring-0 focus-visible:border-forest"
            />
          </div>
          <div className="w-[40%] min-w-[130px] sm:w-64 shrink-0">
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="h-12 rounded-full border-2 border-forest/20 focus:ring-0 focus:border-forest">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{tr("filterAll")}</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.en} - {c.ar}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 overflow-hidden">
            <style>
              {`
                @keyframes cart-move {
                  0% { transform: translateX(-40px); opacity: 0; }
                  20% { opacity: 1; }
                  80% { opacity: 1; }
                  100% { transform: translateX(40px); opacity: 0; }
                }
                .animate-cart {
                  animation: cart-move 1.5s infinite ease-in-out;
                }
              `}
            </style>
            <div className="relative flex h-16 w-32 items-center justify-center">
              <ShoppingCart className="animate-cart h-10 w-10 text-forest" />
            </div>
            <span className="mt-2 text-sm font-semibold text-forest-deep/80 animate-pulse">Loading...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-forest/10 border-dashed">
            <p className="text-xl font-bold text-forest-deep">No products found</p>
            <p className="text-muted-foreground mt-2">Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

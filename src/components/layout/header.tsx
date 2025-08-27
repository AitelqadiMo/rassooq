import { Search, ShoppingCart, User, Menu, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SouqLogo } from "@/components/ui/souq-logo";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useCart, useAppContext } from "@/contexts/AppContext";
import { products, categories } from "@/data/mock-data";
import { MiniCart } from "@/components/ui/mini-cart";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { ShellContext } from "@/components/layout/app-shell";
import { RoleSwitcher } from "@/components/ui/role-switcher";
import React from "react";

export const Header = () => {
  const inShell = React.useContext(ShellContext);
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { state, dispatch } = useAppContext();
  const [miniOpen, setMiniOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const suggestions = React.useMemo(() => {
    if (!query) return [] as Array<{ label: string; href: string }>;
    const productMatches = products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())).slice(0, 5).map(p => ({ label: p.title, href: `/p/${encodeURIComponent(p.title.toLowerCase().replace(/\s+/g, '-'))}` }));
    const categoryMatches = categories.filter(c => c.title.toLowerCase().includes(query.toLowerCase())).slice(0, 5).map(c => ({ label: c.title, href: `/c/${c.id}` }));
    return [...productMatches, ...categoryMatches].slice(0, 8);
  }, [query]);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className={inShell ? "hidden" : "sticky top-0 z-50 w-full glass-nav border-b border-border/20"}>
      <div className="container mx-auto px-4">
        {/* Top row - Mobile: Logo, Search, Icons */}
        <div className="flex items-center justify-between py-4 md:py-5">
          {/* Mobile menu button */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
          
          {/* Logo */}
          <SouqLogo size="lg" className="hidden md:block hover-shimmer" />
          <SouqLogo size="md" className="md:hidden hover-shimmer" />
          
          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-3xl mx-8">
            <form onSubmit={onSearchSubmit} className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search products, brands and categories"
                className="pl-12 pr-6 py-3 glass-card border-0 shadow-medium focus:shadow-large focus:scale-[1.02] transition-elegant text-base"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {suggestions.length > 0 && (
                <div className="absolute z-50 mt-2 w-full glass-card border-0 shadow-floating rounded-xl overflow-hidden">
                  {suggestions.map((s, index) => (
                    <div 
                      key={s.href} 
                      className="px-4 py-3 text-sm hover:bg-primary/10 hover:text-primary cursor-pointer transition-snappy flex items-center gap-3"
                      onMouseDown={() => navigate(s.href)}
                    >
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{s.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>
          
          {/* Right actions */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Desktop role switcher */}
            <div className="hidden md:block">
              <RoleSwitcher />
            </div>
            
            {/* Search icon - Mobile */}
            <Button variant="ghost" size="sm" className="md:hidden glass-card h-10 w-10 hover:shadow-medium">
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Language toggle */}
            <Button variant="ghost" size="sm" className="glass-card h-10 w-10 hover:shadow-medium hover:scale-105 transition-spring" onClick={() => dispatch({ type: 'SET_LANGUAGE', payload: state.language === 'en' ? 'ar' : state.language === 'ar' ? 'fr' : 'en' })}>
              <Globe className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative glass-card h-10 w-10 hover:shadow-medium hover:scale-105 transition-spring" onClick={() => setMiniOpen(true)} data-testid="open-cart">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs shadow-medium animate-pulse"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
            
            {/* Account */}
            <Button variant="ghost" size="sm" className="glass-card h-10 w-10 hover:shadow-medium hover:scale-105 transition-spring" onClick={() => navigate(state.user ? '/account' : '/account/login')} data-testid="account-btn">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Mobile search bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={onSearchSubmit} className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search products..."
              className="pl-12 pr-4 py-3 glass-card border-0 shadow-medium focus:shadow-large transition-elegant"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>
      </div>
      <MiniCart open={miniOpen} onOpenChange={setMiniOpen} />
    </header>
  );
};
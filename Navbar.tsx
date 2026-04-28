import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, Smartphone, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

export function Navbar({ searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: (q: string) => void }) {
  const { totalItems, setIsCartOpen } = useCart();
  const { user, logout, setIsAuthModalOpen } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#f4f4f7]/80 backdrop-blur-md border-b border-black/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex items-center flex-1">
            <button className="p-2 -ml-2 text-slate-500 lg:hidden hover:text-slate-900">
              <Menu className="w-6 h-6" />
            </button>
            <a href="/" className="flex items-center gap-2 ml-4 lg:ml-0 group">
              <div className="bg-slate-900 text-white p-1.5 rounded-lg group-hover:scale-105 transition-transform">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">
                Phone Masters
              </span>
            </a>
          </div>

          <div className="flex-[2] max-w-2xl px-4 hidden md:block">
            <div className="relative group/search">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within/search:text-slate-900 transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-full leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 sm:text-sm transition-all"
                placeholder="Search for smartphones, brands, or models..."
              />
            </div>
          </div>

          <div className="flex items-center justify-end flex-1 space-x-2 sm:space-x-4">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 text-slate-700 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-200/50"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold hidden sm:block truncate max-w-[100px]">
                    {user.name}
                  </span>
                </button>
                
                {isDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50">
                      <div className="px-4 py-2 border-b border-slate-100 mb-1">
                        <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                      </div>
                      <button 
                        onClick={() => {
                          logout();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="flex flex-col items-center justify-center p-2 text-slate-500 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-200/50"
              >
                <User className="w-6 h-6" />
                <span className="text-[10px] uppercase font-bold mt-0.5 hidden sm:block">Sign In</span>
              </button>
            )}
            
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative flex flex-col items-center justify-center p-2 text-slate-500 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-200/50 group/cart"
            >
              <ShoppingCart className="w-6 h-6 group-hover/cart:scale-110 transition-transform duration-200" />
              <span className="text-[10px] uppercase font-bold mt-0.5 hidden sm:block">Cart</span>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-slate-900 rounded-full border-2 border-[#f4f4f7]">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

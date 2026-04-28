import React, { useState } from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export function ProductCard({ product }: { product: Product; key?: React.Key }) {
  const { addToCart } = useCart();
  const [selectedStorage, setSelectedStorage] = useState(product.storage[0]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white border border-black/5 rounded-[24px] p-6 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-200 flex flex-col"
    >
      {/* Badges */}
      <div className="absolute top-9 left-9 z-10 flex flex-col gap-2">
        {product.condition === 'Refurbished' && (
          <span className="bg-orange-100 text-orange-800 text-[10px] uppercase font-bold px-2 py-1 rounded-md tracking-wider">
            Refurbished
          </span>
        )}
        {product.originalPrice && (
          <span className="bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-md tracking-wider shadow-sm">
            Save ${product.originalPrice - product.price}
          </span>
        )}
      </div>

      {/* Image Area */}
      <div className="aspect-[4/5] bg-slate-50 rounded-[16px] relative flex md:p-6 p-4 items-center justify-center overflow-hidden mb-6">
        <motion.img 
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain filter drop-shadow-sm mix-blend-multiply" 
        />
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold text-slate-900">{product.rating}</span>
          <span className="text-xs text-slate-400 ml-1">({product.reviews})</span>
        </div>
        
        <h3 className="text-sm text-slate-400 font-medium tracking-wide mb-1 uppercase">{product.brand}</h3>
        <h2 className="text-lg font-bold text-slate-900 leading-tight mb-2 line-clamp-2">{product.name}</h2>
        
        <div className="mt-auto pt-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            {product.storage.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedStorage(size)}
                className={cn(
                  "text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors",
                  selectedStorage === size 
                    ? "border-slate-900 bg-slate-900 text-white" 
                    : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-900 tracking-tight">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through decoration-1">${product.originalPrice}</span>
              )}
            </div>
            
            <button 
              onClick={() => addToCart(product, selectedStorage)}
              className="bg-slate-900 text-white p-3 rounded-2xl hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-300 transition-all active:scale-95 group/btn"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

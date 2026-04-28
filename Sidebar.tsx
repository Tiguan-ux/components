import React from 'react';
import { cn } from '../lib/utils';
import { Check } from 'lucide-react';

type SidebarProps = {
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  selectedCondition: string | null;
  setSelectedCondition: (condition: string | null) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  className?: string;
};

const BRANDS = ['Apple', 'Samsung', 'Google', 'OnePlus'];
const CONDITIONS = ['New', 'Refurbished'];

export function Sidebar({ 
  selectedBrands, 
  setSelectedBrands, 
  selectedCondition, 
  setSelectedCondition, 
  maxPrice, 
  setMaxPrice,
  className 
}: SidebarProps) {

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <div className={cn("w-full max-w-xs space-y-8 pr-6", className)}>
      <div>
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Brands</h3>
        <div className="space-y-3">
          {BRANDS.map(brand => {
            const isSelected = selectedBrands.includes(brand);
            return (
              <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="hidden" checked={isSelected} onChange={() => toggleBrand(brand)} />
                <div className={cn(
                  "w-5 h-5 rounded-[6px] border flex items-center justify-center transition-colors",
                  isSelected ? "bg-slate-900 border-slate-900 text-white" : "border-slate-200 group-hover:border-slate-400"
                )}>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>
                <span className={cn(
                  "text-sm font-medium transition-colors",
                  isSelected ? "text-slate-900" : "text-slate-500 group-hover:text-slate-900"
                )}>
                  {brand}
                </span>
              </label>
            )
          })}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      <div>
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Condition</h3>
        <div className="space-y-3">
          {CONDITIONS.map(condition => {
            const isSelected = selectedCondition === condition;
            return (
              <label key={condition} className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" className="hidden" checked={isSelected} onChange={() => setSelectedCondition(isSelected ? null : condition)} />
                <div className={cn(
                  "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                  isSelected ? "border-slate-900" : "border-slate-200 group-hover:border-slate-400"
                )}>
                  {isSelected && <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />}
                </div>
                <span className={cn(
                  "text-sm font-medium transition-colors",
                  isSelected ? "text-slate-900" : "text-slate-500 group-hover:text-slate-900"
                )}>
                  {condition}
                </span>
              </label>
            )
          })}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price Range</h3>
          <span className="text-xs font-bold text-slate-900 rounded bg-slate-100 px-2 py-0.5">Up to ${maxPrice}</span>
        </div>
        <input 
          type="range" 
          min="100" 
          max="2000" 
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-bold uppercase">
          <span>$100</span>
          <span>$2000+</span>
        </div>
      </div>
    </div>
  );
}

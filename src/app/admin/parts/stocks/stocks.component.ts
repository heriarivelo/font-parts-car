import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockService } from '../../../service/stock.service';
import {Stock} from '../../../models/stock.model';
import { StockFilterPipe } from './stock.pipe';

interface InventoryItem {
  reference: string;
  name: string;
  category: string;
  brand: string;
  quantity: number;
  price: number;
  status: string;
}

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [CommonModule, StockFilterPipe],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.scss'
})
export class StocksComponent implements OnInit {
  stocks: Stock[] = [];
  analytics: any = {};
  isLoading = true;
  // private _maxSold: number = 1;

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    
    this.stockService.getStocks().subscribe({
      next: (data) => {
        this.stocks = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });

    this.stockService.getStockAnalytics().subscribe({
      next: (data) => {
        this.analytics = data;
      },
      error: (err) => console.error(err)
    });
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'DISPONIBLE': return 'bg-green-100 text-green-800';
      case 'RUPTURE': return 'bg-red-100 text-red-800';
      case 'COMMANDE': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getProgressWidth(quantity: number, alertThreshold = 5): string {
    const percentage = Math.min((quantity / alertThreshold) * 100, 100);
    return `${percentage}%`;
  }

  getProgressColor(quantity: number, alertThreshold = 5): string {
    if (quantity === 0) return 'bg-red-600';
    if (quantity < alertThreshold) return 'bg-yellow-400';
    return 'bg-green-600';
  }

  // Dans stocks.component.ts
get maxSold(): number {
  if (!this.stocks?.length) return 1;
  return Math.max(...this.stocks.map(s => s.quantiteVendu), 1);
}

  isEditMode = false;
  currentItem: InventoryItem | null = null;

  inventoryItems: InventoryItem[] = [
    {
      reference: 'REF-001',
      name: 'Plaquettes de frein avant',
      category: 'Freinage',
      brand: 'BOSCH',
      quantity: 24,
      price: 45.99,
      status: 'En stock'
    },
    {
      reference: 'REF-002',
      name: 'Filtre à huile',
      category: 'Moteur',
      brand: 'MANN FILTER',
      quantity: 5,
      price: 12.50,
      status: 'Faible stock'
    },
    {
      reference: 'REF-003',
      name: 'Bougie d\'allumage',
      category: 'Moteur',
      brand: 'NGK',
      quantity: 0,
      price: 8.99,
      status: 'Épuisé'
    },
    // Ajoutez d'autres éléments selon besoin
  ];

  getStatusClas(status: string): string {
    switch(status) {
      case 'En stock':
        return 'bg-green-100 text-green-800';
      case 'Faible stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Épuisé':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

}

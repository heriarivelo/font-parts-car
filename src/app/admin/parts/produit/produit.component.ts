import { Component, OnInit } from '@angular/core';
import { PieceBdd } from '../../../models/piece.model';
import { PieceService } from '../../../service/piece.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.scss'
})
export class ProduitComponent implements OnInit {
  pieces: PieceBdd[] = [];
  filteredPieces: PieceBdd[] = [];
  searchTerm = '';
  isLoading = true;

  constructor(private piecesService: PieceService) {}

  ngOnInit(): void {
    this.loadPieces();
  }

  loadPieces(): void {
    this.isLoading = true;
    this.piecesService.getPiece().subscribe({
      next: (data) => {
        this.pieces = data;
        this.filteredPieces = [...this.pieces];
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  search(): void {
    if (this.searchTerm.trim()) {
      this.piecesService.searchPieces(this.searchTerm).subscribe({
        next: (data) => this.filteredPieces = data
      });
    } else {
      this.filteredPieces = [...this.pieces];
    }
  }

  getStockStatus(piece: PieceBdd): string {
    const total = piece.stocks.reduce((sum, stock) => sum + stock.quantite, 0);
    return total > 5 ? 'En stock' : total > 0 ? 'Stock faible' : 'Rupture';
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'En stock': return 'bg-green-100 text-green-800';
      case 'Stock faible': return 'bg-yellow-100 text-yellow-800';
      case 'Rupture': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

}

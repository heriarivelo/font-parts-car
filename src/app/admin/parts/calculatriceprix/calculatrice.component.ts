import { Component } from '@angular/core';
import { Piece } from '../../../models/piece.model';
import { PieceService } from '../../../service/piece.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculatrice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculatrice.component.html',
  styleUrl: './calculatrice.component.scss'
})
export class CalculatriceComponent {
  title = 'gestion-pieces';
  parametres: any = {};
  nouvellePiece: Piece = {
    code: '',
    marque: '',
    reference: '',
    autofinal: '',
    libelle: '',
    quantite: 1,
    quantiteArrivee:1,
    prixUnitaireEur: 0,
    poidsKg: 0
  };
  totauxMethode1 = { caPrevisionnel: 0, margeTotale: 0 };
  totauxMethode2 = { caPrevisionnel: 0, margeTotale: 0 };
  totauxFinaux = { caPrevisionnel: 0, margeTotale: 0 };

  constructor(public pieceService: PieceService) {
    this.parametres = this.pieceService.getParametres();
  }

  description = '';
  isSaving = false;
  success = false;
  error = '';
  showImportModal = false;

  appliquerParametres(): void {
    this.pieceService.setParametres(this.parametres);
  }

  ajouterPiece(): void {
    if (this.nouvellePiece.code) {
      this.pieceService.addPiece({...this.nouvellePiece});
      this.nouvellePiece = {
        code: '',
        marque: '',
        reference: '',
        autofinal: '',
        libelle: '',
        quantite: 1,
        quantiteArrivee:1,
        prixUnitaireEur: 0,
        poidsKg: 0
      };
    }
  }

  ngOnInit() {
    this.calculerTotaux();
  }

  calculerTotaux() {
    this.totauxMethode1 = this.pieceService.calculerTotauxMethode1();
    this.totauxMethode2 = this.pieceService.calculerTotauxMethode2();
    this.totauxFinaux = this.pieceService.calculerTotauxFinaux();
  }

  // Appeler cette méthode quand les données changent
  onDonneesChangees() {
    this.calculerTotaux();
  }
  

  supprimerPiece(index: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette pièce ?')) {
      this.pieceService.deletePiece(index);
    }
  }

  arrondirInf(valeur: number, precision: number): number {
    const factor = Math.pow(10, -precision);
    return Math.floor(valeur / factor) * factor;
  }
  exporterExcel(): void {
    this.pieceService.exportToExcel();
  }

  async importerExcel(event: any): Promise<void> {
    const file = event.target.files[0];
    if (!file) return;

    try {
      await this.pieceService.importFromExcel(file);
      // Réinitialiser l'input file pour permettre la sélection du même fichier
      event.target.value = '';
    } catch (error) {
      console.error('Erreur lors de l\'import:', error);
      alert('Une erreur est survenue lors de l\'import du fichier Excel.');
    }
  }

  confirmImport() {
    this.isSaving = true;
    this.error = '';
    
    this.pieceService.enregistrerImport(this.description).subscribe({
      next: () => {
        this.isSaving = false;
        this.success = true;
      },
      error: (err) => {
        this.isSaving = false;
        this.error = 'Erreur lors de l\'enregistrement: ' + err.message;
      }
    });
  }
}

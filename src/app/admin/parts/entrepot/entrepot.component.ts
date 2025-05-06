import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-drag-drop',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './entrepot.component.html',
})
export class EntrepotComponent {
  boxes: { id: number, name: string, items: any[] }[] = [];
  items: { code_art: string, lib1: string, quantite: number, prix_final: number }[] = [];
  newItem = { name: '', description: '' };

  errors: string = '';
  draggedItem: any = null;
  showModal = false;
  selectedBox: any = null;
  articleCode: string = '';
  notFound: boolean = false;
  okay: boolean = false;
  entrepot_libelle: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadEntrepots();  
  }

  async loadEntrepots() {
    try {
      const response = await lastValueFrom(this.http.get<{id: number, libelle: string}[]>('http://localhost:5000/api/entrepot'));
      this.boxes = response.map(entrepot => ({
        name: entrepot.libelle,
        id: entrepot.id,
        items: []
      }));
    } catch (error) {
      console.error("Erreur lors du chargement des entrepôts", error);
    }
  }

  async addItem() {
    if (!this.articleCode.trim()) return;

    try {
      const params = new HttpParams().set('code_art', this.articleCode);
      const response = await lastValueFrom(
        this.http.get<{code_art: string, lib1: string, quantite: number, quantite_vendu: number, prix_final: number}[]>(
          'http://localhost:5000/api/stock/one', 
          { params }
        )
      );

      if (response && response.length > 0) {
        const article = response[0];
        this.items.push({
          code_art: article.code_art,
          lib1: article.lib1,
          quantite: article.quantite - article.quantite_vendu,
          prix_final: article.prix_final
        });
        this.okay = true;
        this.notFound = false;
        this.errors = '';
      } else {
        this.errors = 'Aucun article';
        this.notFound = true;
        this.okay = false;
      }
    } catch (error) {
      console.error("Erreur de recherche de l'article", error);
      this.notFound = false;
      this.okay = false;
      this.errors = 'Erreur lors de la recherche';
    }
  }

  drag(event: DragEvent, item: any) {
    this.draggedItem = item;
  }

  async updateEntrepot(boxId: number, articleId: number) {
    const payload = {
      stockId: articleId,
      entrepotId: boxId
    };

    try {
      await lastValueFrom(this.http.put('http://localhost:5000/api/stock', payload));
      console.log('Changement du stock ajouté à l\'entrepôt');
    } catch (error) {
      console.error('Erreur lors du changement du stock d\'entrepôt', error);
    }
  }

  async NewEntrepot() {
    if (!this.entrepot_libelle.trim()) return;

    try {
      await lastValueFrom(
        this.http.post('http://localhost:7000/api/entrepot', { libelle: this.entrepot_libelle })
      );
      this.entrepot_libelle = '';
      window.location.reload();
      console.log('Entrepot ajouté avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'entrepot', error);
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  async drop(event: DragEvent, box: any) {
    event.preventDefault();
    if (this.draggedItem) {
      console.log(box);
      await this.updateEntrepot(box.id, this.draggedItem.id);
      this.draggedItem = null;
    }
  }

  async openBoxDetails(box: any) {
    try {
      const params = new HttpParams().set('entrepotId', box.id.toString());
      const response = await lastValueFrom(
        this.http.get<any[]>('http://localhost:5000/api/stock/entrepot', { params })
      );
      
      if (response && response.length > 0) {
        box.items = response;
      } else {
        box.items = [];
      }
    } catch (error) {
      console.error("Erreur de recherche des articles de l'entrepôt", error);
      box.items = [];
    }
    this.selectedBox = box;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedBox = null;
  }
}
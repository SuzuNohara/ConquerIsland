import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, documentId, getDocs, setDoc, addDoc, doc, getDoc, deleteDoc, Firestore} from 'firebase/firestore/lite';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    private app;
    private db;

  constructor() {
    this.app = initializeApp(environment.server);
    this.db = getFirestore(this.app);
  }

  public async getCollection(coll: string){
    const dataCol = collection(this.db, coll);
    return getDocs(dataCol);
  }

  public getDocumentRef(doc: any){
    return getDoc(doc);
  }

  public getDocument(document: string){
    return getDoc(doc(this.db, document));
  }

  public setDoc(ref: string, data: any){
    return setDoc(doc(this.db, ref), data);
  }

  public addDocument(coll: string, data: any){
    return addDoc(collection(this.db, coll), data);
  }

  public deleteDoc(document: string){
    return deleteDoc(doc(this.db, document));
  }

};
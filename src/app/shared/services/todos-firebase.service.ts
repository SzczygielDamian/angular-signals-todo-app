import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { TodoInterface } from '../model/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodosFirebaseService {
  firestore = inject(Firestore);
  todosCollection = collection(this.firestore, 'todos');

  getTodos(): Observable<TodoInterface[]> {
    return collectionData(this.todosCollection , {
      idField: 'id',
    }) as Observable<TodoInterface[]>;;
  }

  addTodo(text: string): Observable<string> {
    const todoToCreate = { text, isCompleted: false }
    const promise = addDoc(this.todosCollection, todoToCreate).then(
      (response) => response.id
    );
    return from(promise);
  }

  removeTodo(id: string): Observable<void> {
    const docRef = doc(this.firestore, 'todos/' + id);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  updateTodo(id: string, data: { text: string, isCompleted: boolean}):Observable<void> {
    const docRef = doc(this.firestore, 'todos/' + id);
    const promise = setDoc(docRef, data);
    return from(promise);
  }
}

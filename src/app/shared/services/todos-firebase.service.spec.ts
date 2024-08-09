import { TestBed } from '@angular/core/testing';
import { TodosFirebaseService } from './todos-firebase.service';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { firebaseConfig } from '../../../enviroment/enviroment';


describe('TodosFirebaseService', () => {
  let todosFirebaseService: TodosFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodosFirebaseService,
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideFirestore(() => getFirestore()),
      ]
    });
    todosFirebaseService = TestBed.inject(TodosFirebaseService);
  });

  it('should be created', () => {
    expect(todosFirebaseService).toBeTruthy();
  });

});


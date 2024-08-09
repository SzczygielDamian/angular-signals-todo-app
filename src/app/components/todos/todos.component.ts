import { Component, inject, OnInit } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { TodosService } from '../../shared/services/todos.service';
import { TodosFirebaseService } from '../../shared/services/todos-firebase.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [ListComponent, FooterComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {
  todosService = inject(TodosService);
  todosFirebasesService = inject(TodosFirebaseService);
  error = '';

  ngOnInit(): void {
    this.todosFirebasesService.getTodos().subscribe((todos) => this.todosService.todosSig.set(todos));
  }

  addTodo(event: Event): void { 
    const text = (event.target as HTMLInputElement).value;
    if (text !== '') {
      this.todosFirebasesService.addTodo(text);
      (event.target as HTMLInputElement).value = "";
    }
  }
}

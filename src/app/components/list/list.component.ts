import { Component, computed, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodosService } from '../../shared/services/todos.service';
import { FilterEnum } from '../../shared/model/filter.enum';
import { TodosFirebaseService } from '../../shared/services/todos-firebase.service';
import { TodoInterface } from '../../shared/model/todo.interface';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  todosService = inject(TodosService);
  todosFirebasesService = inject(TodosFirebaseService);
  editingText = '';

  @ViewChild('textInput') textInput?: ElementRef;

  visibleTodoList = computed(() => {
    const todos = this.todosService.todosSig();
    const filter = this.todosService.filterSig();
      
    if (filter === FilterEnum.Active) {
      return todos.filter((todo) => !todo.isCompleted);
    } else if (filter === FilterEnum.Completed) {
      return todos.filter((todo) => todo.isCompleted);
    }
    
    return todos;
  });

  removeTodo(id: string): void {
    this.todosFirebasesService.removeTodo(id).subscribe(() => {
      this.todosService.removeTodo(id);
    });
  }

  editTodo(id: string) {
     this.todosService.isEditingTodo(id); 
     setTimeout(() => {
      this.textInput?.nativeElement.focus();
    }, 0);
  }

  toggleTodo(item: TodoInterface): void {
    const { id, text, isCompleted } = item;
    this.todosFirebasesService.updateTodo(id, {
      text,
      isCompleted: !isCompleted,
    });
  }

  changeText(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  changeTodo(item: TodoInterface): void {
    const { id, isCompleted } = item;
    
    this.todosFirebasesService.updateTodo(id, {
      text: this.editingText,
      isCompleted: isCompleted,
    }).subscribe(() => {
      this.editingText = '';
    });
  }

  onFocusOutEvent(id: string){  
   this.todosService.isEditingTodo(id);
 }
}

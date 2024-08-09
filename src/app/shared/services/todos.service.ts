import { Injectable, signal } from "@angular/core";
import { FilterEnum } from "../model/filter.enum";
import { forkJoin } from "rxjs";
import { TodoInterface } from "../model/todo.interface";


@Injectable({
    providedIn: 'root',
})
export class TodosService {
    todosSig = signal<TodoInterface[]>([]);
    filterSig = signal<FilterEnum>(FilterEnum.All);

    changeFilter(filterName: FilterEnum): void {
        this.filterSig.set(filterName);
    }

    addTodo(text: string, id: string): void {
        const newTodo = {
            id,
            text,
            isCompleted: false
        };
        this.todosSig.update((todos) => [...todos, newTodo]);
    }

    changeTodo(id: string, text: string): void {
        this.todosSig.update((todos) => todos.map((todo) => todo.id === id ? { ...todo, text } : todo));
    }

    removeTodo(id: string): void {
        this.todosSig.update((todos) => todos.filter(todo => todo.id !== id ));
    }

    toggleTodo(id: string): void {
        this.todosSig.update((todos) => todos.map((todo) => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo));
    }
    

    toggleAll(isCompleted: boolean): void {
      this.todosSig.update((todos) => todos.map((todo) => ({ ...todo, isCompleted })));
    }

    isEditingTodo(id: string): void {
        this.todosSig.update((todos) => todos.map((todo) => todo.id === id ? {...todo, _isEditing: !todo._isEditing} : todo));
    }
}
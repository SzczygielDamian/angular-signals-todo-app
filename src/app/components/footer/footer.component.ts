import { Component, computed, inject } from '@angular/core';
import { TodosService } from '../../shared/services/todos.service';
import { FilterEnum } from '../../shared/model/filter.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  todosService = inject(TodosService);
  filters = Object.values(FilterEnum)
  filterSig = this.todosService.filterSig;
  filterEnum: typeof FilterEnum = FilterEnum;

  itemToLeft = computed(() => this.todosService.todosSig().filter((todo) => !todo.isCompleted).length)

  changefilter(filter: FilterEnum): void {
      this.todosService.changeFilter(filter);
  }
}

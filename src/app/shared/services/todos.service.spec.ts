import { TestBed } from '@angular/core/testing';
import { TodosService } from './todos.service';
import { FilterEnum } from '../model/filter.enum';


describe('TodosService', () => {
  let todosService: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [TodosService]
    })
    todosService = TestBed.inject(TodosService);
    });


    it('create service', () => {
        expect(todosService).toBeTruthy();
    });

    it('sets initial data', () => {
        expect(todosService.todosSig()).toEqual([]);
        expect(todosService.filterSig()).toEqual(FilterEnum.All);
    });

    describe('changeFilter', () => {
        it('changes the filter', () => {
            todosService.changeFilter(FilterEnum.Active)
            expect(todosService.filterSig()).toEqual(FilterEnum.Active);
        });
    });

    describe('addTodo', () => {
        it('add todo', () => {
            todosService.addTodo('foo', '1');
            expect(todosService.todosSig()).toEqual([{
                text: 'foo',
                isCompleted: false,
                id: "1",
            }]);
        });
    });

    describe('changeTodo', () => {
        it('updates a todo', () => {
            todosService.todosSig.set([{
             text: 'foo',
                isCompleted: false,
                id: "1",
            }])
            todosService.changeTodo('1', 'bar');
            expect(todosService.todosSig()).toEqual([{
                text: 'bar',
                isCompleted: false,
                id: "1",
            }]);
        });
    });
    describe('removeTodo', () => {
        it('remove a todo', () => {
            todosService.todosSig.set([{
                text: 'foo',
                isCompleted: false,
                id: "1",
            }])
            todosService.removeTodo('1');
            expect(todosService.todosSig()).toEqual([]);
        });
    });

    describe('removeTodo', () => {
        it('remove a todo', () => {
            todosService.todosSig.set([{
                text: 'foo',
                isCompleted: false,
                id: "1",
            }])
            todosService.removeTodo('1');
            expect(todosService.todosSig()).toEqual([]);
        });
    });

    describe('toggleTodo', () => {
        it('toogle a todo', () => {
            todosService.todosSig.set([{
                text: 'foo',
                isCompleted: false,
                id: "1",
            }])
            todosService.toggleTodo('1');
            expect(todosService.todosSig()).toEqual([
                {
                    text: 'foo',
                    isCompleted: true,
                    id: "1",
                }
            ]);
        });
    });

    describe('toggleAllTodos', () => {
        it('toogle all todos', () => {
            todosService.todosSig.set([{
                text: 'foo',
                isCompleted: false,
                id: "1",
            },
            {
                text: 'bar',
                isCompleted: false,
                id: "2",
            }])
            todosService.toggleAll(true);
            expect(todosService.todosSig()).toEqual([
                {
                    text: 'foo',
                    isCompleted: true,
                    id: "1",
                },
                {
                    text: 'bar',
                    isCompleted: true,
                    id: "2",
                }
            ]);
        });
    });
});


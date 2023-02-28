import { Body, Controller, Get, Patch, Post } from '@nestjs/common'
import { Delete, Param } from '@nestjs/common/decorators'
import { Todo } from '@prisma/client'
import { TodoService } from 'src/services/todo.service'

@Controller()
export class AppController {
  constructor(private readonly todoService: TodoService) {}

  @Get('/todos')
  async getAllTodos(): Promise<Todo[]> {
    return this.todoService.getTodos({})
  }

  @Get('/todos/uncompleted')
  async getUncompletedTodos(): Promise<Todo[]> {
    return this.todoService.getTodos({
      where: { completed: false },
    })
  }

  @Get('/todos/completed')
  async getCompletedTodos(): Promise<Todo[]> {
    return this.todoService.getTodos({ where: { completed: true } })
  }

  @Post('/todo')
  async createTodo(@Body() data: { name: string }): Promise<Todo> {
    return this.todoService.createTodo(data)
  }

  @Patch('/todo')
  async updateTodo(@Body() data: { id: number; completed: boolean }) {
    return this.todoService.updateTodo({
      where: { id: Number(data.id) },
      data: { completed: data.completed },
    })
  }

  @Delete('/todo/:id')
  async deleteTodo(@Param('id') id: number): Promise<Todo> {
    return this.todoService.deleteTodo({ id: Number(id) })
  }
}

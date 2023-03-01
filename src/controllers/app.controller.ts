import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common'
import { Delete, Param } from '@nestjs/common/decorators'
import { Todo, User } from '@prisma/client'
import { TodoService } from 'src/services/todo.service'
import { UserService } from 'src/services/user.service'
import { LocalAuthGuard } from 'src/local-auth.guard'
import { AuthService } from 'src/services/auth.service'

@Controller()
export class AppController {
  constructor(
    private readonly todoService: TodoService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // TODOSERVICE
  @Get('/listTodos')
  async getAllTodos(): Promise<Todo[]> {
    return this.todoService.getTodos({
      orderBy: {
        id: 'asc',
      },
    })
  }

  @Get('/todos/uncompleted')
  async getUncompletedTodos(): Promise<Todo[]> {
    return this.todoService.getTodos({
      where: { completed: false },
      orderBy: {
        id: 'asc',
      },
    })
  }

  @Get('/todos/completed')
  async getCompletedTodos(): Promise<Todo[]> {
    return this.todoService.getTodos({
      where: { completed: true },
      orderBy: {
        id: 'asc',
      },
    })
  }

  @Post('/createTodo')
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

  @Patch('/markTodoCompleted')
  async markTodoCompleted(@Body() data: { id: number }) {
    return this.todoService.updateTodo({
      where: { id: Number(data.id) },
      data: { completed: true },
    })
  }

  @Patch('/markTodoUncompleted')
  async markTodoUncompleted(@Body() data: { id: number }) {
    return this.todoService.updateTodo({
      where: { id: Number(data.id) },
      data: { completed: false },
    })
  }

  @Delete('/todo/:id')
  async deleteTodo(@Param('id') id: number): Promise<Todo> {
    return this.todoService.deleteTodo({ id: Number(id) })
  }

  // TODOSERVICE

  // USERSERVICE
  @Post('/signUp')
  async signUp(@Body() data: { name: string; email: string; password: string }): Promise<User> {
    return this.userService.createUser(data)
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }
  // USERSERVICE
}

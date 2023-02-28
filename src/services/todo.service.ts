import { Injectable } from '@nestjs/common'
import { Todo, Prisma } from '@prisma/client'
import { PrismaService } from './prisma.service'

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getTodos(params: {
    skip?: number
    take?: number
    cursor?: Prisma.TodoWhereUniqueInput
    where?: Prisma.TodoWhereInput
    orderBy?: Prisma.TodoOrderByWithRelationInput
  }): Promise<Todo[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.todo.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async createTodo(data: Prisma.TodoCreateInput): Promise<Todo> {
    return this.prisma.todo.create({
      data,
    })
  }

  async updateTodo(params: {
    where: Prisma.TodoWhereUniqueInput
    data: Prisma.TodoUpdateInput
  }): Promise<Todo> {
    const { data, where } = params
    return this.prisma.todo.update({
      data,
      where,
    })
  }

  async deleteTodo(where: Prisma.TodoWhereUniqueInput): Promise<Todo> {
    return this.prisma.todo.delete({ where })
  }
}

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from 'src/controllers/app.controller'
import { PrismaService } from 'src/services/prisma.service'
import { TodoService } from 'src/services/todo.service'
import { UserService } from 'src/services/user.service'
import { AppService } from '../services/app.service'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, PrismaService, TodoService, UserService],
})
export class AppModule {}

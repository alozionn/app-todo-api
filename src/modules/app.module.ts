import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from 'src/controllers/app.controller'
// import { LocalStrategy } from 'src/local.strategy'
// import { AuthService } from 'src/services/auth.service'
import { PrismaService } from 'src/services/prisma.service'
import { TodoService } from 'src/services/todo.service'
import { UserService } from 'src/services/user.service'
import { AppService } from '../services/app.service'
import { PassportModule } from '@nestjs/passport'
import { AuthModule } from './auth.module'
@Module({
  imports: [ConfigModule.forRoot(), PassportModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, TodoService, UserService],
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { PrismaService } from 'src/services/prisma.service'
import { UserService } from 'src/services/user.service'

@Module({
  providers: [UserService, PrismaService],
  exports: [UserService, PrismaService],
})
export class UserModule {}

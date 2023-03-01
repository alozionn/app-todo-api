import { Module } from '@nestjs/common'
import { AuthService } from 'src/services/auth.service'
import { UserModule } from './user.module'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from 'src/local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from 'src/utils/constants'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}

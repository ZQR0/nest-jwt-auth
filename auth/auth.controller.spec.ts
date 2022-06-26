import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.contoller";
import { AuthService } from "./auth.service";
import { UserService } from 'src/user/user.service';

describe('AuthContoller', () => {
    let authController: AuthController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService, UserService]
        }).compile();

        authController = app.get<AuthController>(AuthController);
    });

    describe('getTest', () => {
        it('should return "Test passed"', () => {
            expect(authController.getTest()).toBe('Test passed');
        });
    });
});
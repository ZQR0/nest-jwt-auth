import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserEntity } from "src/entities/user.entity";

export const CurrentUser = createParamDecorator(
    (data: keyof UserEntity, ctx: ExecutionContext): Promise<any> => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        return data ? user[data] : user;
    }
)
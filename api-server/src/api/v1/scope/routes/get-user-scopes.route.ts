import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import Joi from "joi";
import { ScopeEnum } from "../../../../configs/scope.enum";
import { IResponse } from "../../../../interfaces/IResponse";
import { responseSchema } from "../../../../interfaces/response.schema";
import { ScopeController } from "../scope.controller";

export const getUserScopesRoute = (server: Server, controller: ScopeController, path: string) => {
    server.route({
        method: "GET",
        path,
        options: {
            tags: ['api'],
            description: 'Get all scopes by username',
            notes: `Public`,
            response: {
                schema: responseSchema.keys({ data: Joi.array().items().valid({ ...Object.keys(ScopeEnum) }) }),
                failAction: 'log'
            },
            validate: {
                params: Joi.object({
                    username: Joi.string().required()
                })
            },
            handler: async (request: Request, reply: ResponseToolkit) => {
                return reply.response({
                    statusCode: 200,
                    data: await controller.getUserScopes(request.params.username)
                } as IResponse).code(200);
            }
        }
    });
}

import { inject } from 'inversify';
import * as Joi from 'joi';
import { ILogger } from '../../common/logger/ILogger';
import { INVERSIFY_TYPES } from '../../inversify/inversifyTypes';
import { ValidationMiddleware } from '../../middlerware/ValidationMiddleware';

export const SendMessageSchema = Joi.object().keys({
  textMessage: Joi.string().required(),
  groupId: Joi.string().required(),
  _user: Joi.object().optional(), // Authentication
});

export interface ISendMessageSchema {
  textMessage: string;
  groupId: string;
}

// eslint-disable-next-line max-len
export class SendMessageValidationMiddleware extends ValidationMiddleware<ISendMessageSchema> {
  constructor(@inject(INVERSIFY_TYPES.Logger) logger: ILogger) {
    super(logger, SendMessageSchema);
  }
}

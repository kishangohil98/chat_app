import { inject } from 'inversify';
import * as Joi from 'joi';
import { ILogger } from '../../common/logger/ILogger';
import { INVERSIFY_TYPES } from '../../inversify/inversifyTypes';
import { ValidationMiddleware } from '../../middlerware/ValidationMiddleware';
import { GroupType } from '../../entities/Group';

export const JoinGroupSchema = Joi.object().keys({
  groupType: Joi.string().valid(GroupType.DM, GroupType.GROUP).required(),
  userId: Joi.alternatives().conditional('groupType', {
    is: GroupType.DM,
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
  _user: Joi.object().optional(), // Authentication
  groupId: Joi.alternatives().conditional('groupType', {
    is: GroupType.GROUP,
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
});

export interface IJoinGroupSchema {
  groupType: GroupType;
  userId?: string;
  groupId?: string;
}

// eslint-disable-next-line max-len
export class JoinGroupValidationMiddleware extends ValidationMiddleware<IJoinGroupSchema> {
  constructor(@inject(INVERSIFY_TYPES.Logger) logger: ILogger) {
    super(logger, JoinGroupSchema);
  }
}

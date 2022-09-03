import { Activity } from './activity.entity';
import { ACTIVITY_REPOSITORY } from '../../core/constants';

export const activitiesProviders = [{
    provide: ACTIVITY_REPOSITORY,
    useValue: Activity,
}];
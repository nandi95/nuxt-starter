import type { Attributes } from '@upfrontjs/framework';
import { Factory } from '@upfrontjs/framework';
import type User from '~/upfront/models/User';

export default class UserFactory extends Factory<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    definition(_emptyModel: User, _loopIndex: number): Attributes<User> {
        return {
            name: 'user name',
            email: 'username@email.com'
        };
    }
}

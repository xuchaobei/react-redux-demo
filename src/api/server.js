import {
  Server,
  Model,
  Factory,
  belongsTo,
  hasMany,
  association,
  RestSerializer,
  Response,
} from 'miragejs';

import faker from 'faker';
import { sentence, paragraph, article, setRandom } from 'txtgen';
import { parseISO } from 'date-fns';
import seedrandom from 'seedrandom';

const IdSerializer = RestSerializer.extend({
  serializeIds: 'always',
});

// Set up a seeded random number generator, so that we get
// a consistent set of users / entries each time the page loads.
// This can be reset by deleting this localStorage value,
// or turned off by setting `useSeededRNG` to false.
let useSeededRNG = true;

let rng = seedrandom();

if (useSeededRNG) {
  let randomSeedString = localStorage.getItem('randomTimestampSeed');
  let seedDate;

  if (randomSeedString) {
    seedDate = new Date(randomSeedString);
  } else {
    seedDate = new Date();
    randomSeedString = seedDate.toISOString();
    localStorage.setItem('randomTimestampSeed', randomSeedString);
  }

  rng = seedrandom(randomSeedString);
  setRandom(rng);
  faker.seed(seedDate.getTime());
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(rng() * (max - min + 1)) + min;
}

const randomFromArray = (array) => {
  const index = getRandomInt(0, array.length - 1);
  return array[index];
};

const notificationTemplates = [
  'poked you',
  'says hi!',
  `is glad we're friends`,
  'sent you a gift',
];

new Server({
  routes() {
    this.namespace = 'fakeApi';
    this.timing = 1000;

    this.resource('users');
    // this.resource('posts');
    this.resource('comments');

    const server = this;

    this.post('/login', function (schema, req) {
      let attrs = JSON.parse(req.requestBody);
      const user = schema.users.findBy({ username: attrs.username });
      if (user) {
        return user;
      } else {
        return new Response(
          400,
          {},
          { error: 'Username or password is wrong' },
        );
      }
    });

    this.get('/posts', function (schema, req) {
      const posts = schema.posts.all().sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        } else if (a.date > b.date) {
          return -1;
        } else {
          return 0;
        }
      });

      const postsWithAuthor = posts.models.map((item) => {
        return {
          ...this.serialize(item).post,
          user: { username: item.user.username, id: item.user.id },
        };
      });

      return { posts: postsWithAuthor };
    });

    this.post('/posts', function (schema, req) {
      const data = this.normalizedRequestAttrs();
      data.date = new Date();
      // Work around some odd behavior by Mirage that's causing an extra
      // user entry to be created unexpectedly when we only supply a userId.
      // It really want an entire Model passed in as data.user for some reason.
      const user = schema.users.find(data.userId);
      data.user = user;

      if (data.content === 'error') {
        throw new Error('Could not save the post!');
      }

      const result = server.create('post', data);
      return result;
    });

    this.get('/posts/:postId', function (schema, req) {
      const post = schema.posts.find(req.params.postId);
      return {
        post: {
          ...this.serialize(post).post,
          user: { username: post.user.username, id: post.user.id },
        },
      };
    });

    this.post('posts/:postId/reaction', function (schema, req) {
      let attrs = JSON.parse(req.requestBody);
      const post = schema.posts.find(req.params.postId);
      post.reactions[attrs.reaction] = post.reactions[attrs.reaction] + 1;
      post.save();
      return {
        post: {
          ...this.serialize(post).post,
          user: { username: post.user.username, id: post.user.id },
        },
      };
    });

    this.get('/posts/:postId/comments', (schema, req) => {
      const post = schema.posts.find(req.params.postId);
      return post.comments;
    });

    this.get('/notifications', (schema, req) => {
      const numNotifications = getRandomInt(1, 5);

      let pastDate;

      const now = new Date();

      if (req.queryParams.since) {
        pastDate = parseISO(req.queryParams.since);
      } else {
        pastDate = new Date(now.valueOf());
        pastDate.setMinutes(pastDate.getMinutes() - 15);
      }

      // Create N random notifications. We won't bother saving these
      // in the DB - just generate a new batch and return them.
      const notifications = [...Array(numNotifications)].map(() => {
        const user = randomFromArray(schema.db.users);
        const template = randomFromArray(notificationTemplates);
        return {
          id: faker.datatype.uuid(),
          date: faker.date.between(pastDate, now).toISOString(),
          message: template,
          user: user.id,
          read: false,
          isNew: true,
        };
      });

      return { notifications };
    });
  },
  models: {
    user: Model.extend({
      posts: hasMany(),
    }),
    post: Model.extend({
      user: belongsTo(),
      comments: hasMany(),
    }),
    comment: Model.extend({
      post: belongsTo(),
    }),
    notification: Model.extend({}),
  },
  factories: {
    user: Factory.extend({
      id() {
        return faker.datatype.uuid();
      },
      name() {
        return faker.name.findName();
      },
      username() {
        return faker.internet.userName();
      },

      afterCreate(user, server) {
        // server.createList('post', 3, { user });
      },
    }),
    post: Factory.extend({
      id() {
        return faker.datatype.uuid();
      },
      title() {
        return sentence();
      },
      date() {
        return faker.date.recent(7);
      },
      content() {
        return article(1);
      },
      reactions() {
        return {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        };
      },
      afterCreate(post, server) {
        //server.createList('comment', 3, { post })
      },

      user: association(),
    }),
    comment: Factory.extend({
      id() {
        return faker.datatype.uuid();
      },
      date() {
        return faker.date.past(2);
      },
      text() {
        return paragraph();
      },
      post: association(),
    }),
  },
  serializers: {
    user: IdSerializer,
    post: IdSerializer,
    comment: IdSerializer,
  },
  seeds(server) {
    const users = server.createList('user', 2);
    users.forEach((user) => {
      server.createList('post', 3, { user });
    });
    server.create('user', { username: 'jason' });
  },
});

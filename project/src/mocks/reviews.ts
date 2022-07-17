import { Comment } from '../types/comment';

export const reviews: Comment[] = [
  {
    comment:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, vitae? Asperiores maxime autem adipisci fuga eum! Praesentium magnam suscipit dignissimos ipsum ex ducimus, exercitationem quam corrupti qui illum neque vero placeat unde quasi. Vero repellat modi alias deleniti quas non a, error sunt ad in, rem incidunt nulla eligendi sapiente.',
    date: 'April 2021',
    id: 1,
    rating: 4,
    user: {
      avatarUrl: 'http://picsum.photos/300/200?random=4',
      id: 2,
      isPro: true,
      name: 'Bill',
    },
  },
  {
    comment:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, vitae? Asperiores maxime autem adipisci fuga eum! Praesentium magnam suscipit dignissimos ipsum ex ducimus, exercitationem quam corrupti qui illum neque vero placeat unde quasi. Vero repellat modi alias deleniti quas non a, error sunt ad in, rem incidunt nulla eligendi sapiente.',
    date: 'October 2010',
    id: 2,
    rating: 3,
    user: {
      avatarUrl: 'http://picsum.photos/300/200?random=4',
      id: 1,
      isPro: false,
      name: 'Sam',
    },
  },
  {
    comment:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, vitae? Asperiores maxime autem adipisci fuga eum! Praesentium magnam suscipit dignissimos ipsum ex ducimus, exercitationem quam corrupti qui illum neque vero placeat unde quasi. Vero repellat modi alias deleniti quas non a, error sunt ad in, rem incidunt nulla eligendi sapiente.',
    date: 'April 2021',
    id: 3,
    rating: 1,
    user: {
      avatarUrl: 'http://picsum.photos/300/200?random=4',
      id: 3,
      isPro: true,
      name: 'John',
    },
  },
  {
    comment:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, vitae? Asperiores maxime autem adipisci fuga eum! Praesentium magnam suscipit dignissimos ipsum ex ducimus, exercitationem quam corrupti qui illum neque vero placeat unde quasi. Vero repellat modi alias deleniti quas non a, error sunt ad in, rem incidunt nulla eligendi sapiente.',
    date: 'June 1998',
    id: 4,
    rating: 5,
    user: {
      avatarUrl: 'http://picsum.photos/300/200?random=4',
      id: 4,
      isPro: false,
      name: 'Tim',
    },
  },
  {
    comment:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, vitae? Asperiores maxime autem adipisci fuga eum! Praesentium magnam suscipit dignissimos ipsum ex ducimus, exercitationem quam corrupti qui illum neque vero placeat unde quasi. Vero repellat modi alias deleniti quas non a, error sunt ad in, rem incidunt nulla eligendi sapiente.',
    date: 'Fabruary 2008',
    id: 5,
    rating: 3,
    user: {
      avatarUrl: 'http://picsum.photos/300/200?random=4',
      id: 5,
      isPro: false,
      name: 'Max',
    },
  },
];

const places = [
  {
    id: 'fsadhajdf54642yhdfh',
    img: 'http://picsum.photos/300/200?random=1',
    title: '1428 Elm Street',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    primality: 'Premium',
    type: 'house',
    rating: '4.6',
    bedroomsNumber: '1',
    guestsNumber: '4',
    pricePerNight: '150',
    listOfItems: ['Heating', 'Wifi', 'Kitchen', 'Cable TV'],
    hostInfo: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, vitae? Asperiores maxime autem adipisci fuga eum! Praesentium magnam suscipit dignissimos ipsum ex ducimus, exercitationem quam corrupti qui illum neque vero placeat unde quasi. Vero repellat modi alias deleniti quas non a, error sunt ad in, rem incidunt nulla eligendi sapiente.',
  },
  {
    id: 'fsadfsafast643656hdfh',
    img: 'http://picsum.photos/300/200?random=2',
    title: 'Resort & Spa',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    primality: '',
    type: 'apartment',
    rating: '3.7',
    bedroomsNumber: '2',
    guestsNumber: '3',
    pricePerNight: '300',
    listOfItems: ['Heating', 'Cable TV', 'Kitchen'],
    hostInfo: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, vitae? Asperiores maxime autem adipisci fuga eum! Praesentium magnam suscipit dignissimos ipsum ex ducimus, exercitationem quam corrupti qui illum neque vero placeat unde quasi. Vero repellat modi alias deleniti quas non a, error sunt ad in, rem incidunt nulla eligendi sapiente.',
  },
  {
    id: 'fsa636326t5gdfghdfh',
    img: 'http://picsum.photos/300/200?random=3',
    title: '1408',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    primality: 'Premium',
    type: 'room',
    rating: '2.1',
    bedroomsNumber: '2',
    guestsNumber: '2',
    pricePerNight: '70',
    listOfItems: ['Wifi', 'Kitchen'],
    hostInfo: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, vitae? Asperiores maxime autem adipisci fuga eum! Praesentium magnam suscipit dignissimos ipsum ex ducimus, exercitationem quam corrupti qui illum neque vero placeat unde quasi. Vero repellat modi alias deleniti quas non a, error sunt ad in, rem incidunt nulla eligendi sapiente.',
  },
  {
    id: 'fsa234f54gfdg7543fh',
    img: 'http://picsum.photos/300/200?random=4',
    title: 'Crystal Lake',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    primality: '',
    type: 'hotel',
    rating: '0.5',
    bedroomsNumber: '1',
    guestsNumber: '6',
    pricePerNight: '110',
    listOfItems: ['Cable TV', 'Kitchen'],
    hostInfo: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, vitae? Asperiores maxime autem adipisci fuga eum! Praesentium magnam suscipit dignissimos ipsum ex ducimus, exercitationem quam corrupti qui illum neque vero placeat unde quasi. Vero repellat modi alias deleniti quas non a, error sunt ad in, rem incidunt nulla eligendi sapiente.',
  },
];

const reviews = [
  {
    avatar: 'http://picsum.photos/300/200?random=1',
    author: 'Bob',
    rainting: '4',
    date: 'May 2020',
    review: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, vitae? Asperiores maxime autem adipisci fuga eum! Praesentium magnam suscipit dignissimos ipsum ex ducimus, exercitationem quam corrupti qui illum neque vero placeat unde quasi. Vero repellat modi alias deleniti quas non a, error sunt ad in, rem incidunt nulla eligendi sapiente.'
  },
  {
    avatar: 'http://picsum.photos/300/200?random=1',
    author: 'John',
    rainting: '3',
    date: 'February 2018',
    review: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, vitae? Asperiores maxime autem adipisci fuga eum! Praesentium magnam suscipit dignissimos ipsum ex ducimus, exercitationem quam corrupti qui illum neque vero placeat unde quasi. Vero repellat modi alias deleniti quas non a, error sunt ad in, rem incidunt nulla eligendi sapiente.'
  },
  {
    avatar: 'http://picsum.photos/300/200?random=2',
    author: 'Sam',
    rainting: '2',
    date: 'December 2021',
    review: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, vitae? Asperiores maxime autem adipisci fuga eum! Praesentium magnam suscipit dignissimos ipsum ex ducimus, exercitationem quam corrupti qui illum neque vero placeat unde quasi. Vero repellat modi alias deleniti quas non a, error sunt ad in, rem incidunt nulla eligendi sapiente.'
  },
  {
    avatar: 'http://picsum.photos/300/200?random=3',
    author: 'Peter',
    rainting: '1',
    date: 'October 2007',
    review: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, vitae? Asperiores maxime autem adipisci fuga eum! Praesentium magnam suscipit dignissimos ipsum ex ducimus, exercitationem quam corrupti qui illum neque vero placeat unde quasi. Vero repellat modi alias deleniti quas non a, error sunt ad in, rem incidunt nulla eligendi sapiente.'
  },
  {
    avatar: 'http://picsum.photos/300/200?random=4',
    author: 'May',
    rainting: '5',
    date: 'June 2021',
    review: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, vitae? Asperiores maxime autem adipisci fuga eum! Praesentium magnam suscipit dignissimos ipsum ex ducimus, exercitationem quam corrupti qui illum neque vero placeat unde quasi. Vero repellat modi alias deleniti quas non a, error sunt ad in, rem incidunt nulla eligendi sapiente.'
  },
  {
    avatar: 'http://picsum.photos/300/200?random=5',
    author: 'Ban',
    rainting: '4',
    date: 'April 2002',
    review: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, vitae? Asperiores maxime autem adipisci fuga eum! Praesentium magnam suscipit dignissimos ipsum ex ducimus, exercitationem quam corrupti qui illum neque vero placeat unde quasi. Vero repellat modi alias deleniti quas non a, error sunt ad in, rem incidunt nulla eligendi sapiente.'
  },
  {
    avatar: 'http://picsum.photos/300/200?random=6',
    author: 'Felicia',
    rainting: '2',
    date: 'May 2021',
    review: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, vitae? Asperiores maxime autem adipisci fuga eum! Praesentium magnam suscipit dignissimos ipsum ex ducimus, exercitationem quam corrupti qui illum neque vero placeat unde quasi. Vero repellat modi alias deleniti quas non a, error sunt ad in, rem incidunt nulla eligendi sapiente.'
  },
  {
    avatar: 'http://picsum.photos/300/200?random=7',
    author: 'Harry',
    rainting: '2',
    date: 'November 1998',
    review: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, vitae? Asperiores maxime autem adipisci fuga eum! Praesentium magnam suscipit dignissimos ipsum ex ducimus, exercitationem quam corrupti qui illum neque vero placeat unde quasi. Vero repellat modi alias deleniti quas non a, error sunt ad in, rem incidunt nulla eligendi sapiente.'
  },
  {
    avatar: 'http://picsum.photos/300/200?random=8',
    author: 'Norman',
    rainting: '1',
    date: 'August 2011',
    review: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, vitae? Asperiores maxime autem adipisci fuga eum! Praesentium magnam suscipit dignissimos ipsum ex ducimus, exercitationem quam corrupti qui illum neque vero placeat unde quasi. Vero repellat modi alias deleniti quas non a, error sunt ad in, rem incidunt nulla eligendi sapiente.'
  },
];

export { places, reviews };

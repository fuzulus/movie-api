db.createUser({
    user: 'movie-api',
    pwd: 'movie-api',
    roles: [
        {
            role: 'readWrite',
            db: 'movie-api',
        },
    ],
});

db.createCollection('users');

db.users.insert([
    {
        id: 123,
        role: 'basic',
        fullName: 'Basic Thomas',
        username: 'basic-thomas',
        password:
            'e0dd1561ede252378820ab83075ed7012922ea12c0674b8fdd3e43bc24fffcb0',
    },
    {
        id: 434,
        role: 'premium',
        fullName: 'Premium Jim',
        username: 'premium-jim',
        password:
            'a31dbde167cc26cfff9de3ac140ec58cb0e6b1208d9dd83a7fe164ddb798132e',
    },
]);

db.createCollection('movies');

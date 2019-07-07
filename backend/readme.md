# Gif browser backend

Laravel Lumen is a stunningly fast PHP micro-framework for building web applications with expressive, elegant syntax. We believe development must be an enjoyable, creative experience to be truly fulfilling. Lumen attempts to take the pain out of development by easing common tasks used in the majority of web projects, such as routing, database abstraction, queueing, and caching.

the server will be `http://localhost:80/`

## Set up

To set up first clone this repo into your local machine

cd into backend and install dependencies

```bash
    composer install
```

Copy the .env file:

```bash
    $ cp .env.example .env
```

after that run the next command:

```bash
    $ php artisan key:generate
```

cd into backend/laradock

```bash
    $ cd backend/laradock
```
copy the .env file:

```bash
    $ cp .env-example .env
```
inside laradock type the next command:

```bash
    $ docker-compose up -d apache2 mysql
```

## Users

 Since a registration page was not required all users are already made in the database:

 ```
 +----+---------------------+----------------------------------+--------------------------------------------------------------+---------------------+---------------------+
| id | username            | email                            | password                                                     | created_at          | updated_at          |
+----+---------------------+----------------------------------+--------------------------------------------------------------+---------------------+---------------------+
|  1 | Ephraim Wiza        | ephraim78@yahoo.com              | $2y$10$uM7Uypf8yANe4oeR9t3zL.BDKrUN.58vAqW6Zas90Zg/Kj7WhrEqe | 2019-06-20 02:55:01 | 2019-06-20 02:55:01 |
|  2 | Nickolas Block      | hortense26@gmail.com             | $2y$10$eA/SytI2rGHZxyZjRuq6wO2NVBtZVuw2vQRuENP/FVzHFXEPgCt6W | 2019-06-20 02:55:01 | 2019-06-20 02:55:01 |
|  3 | Kieran Medhurst Jr. | walsh.emelie@swaniawski.info     | $2y$10$f702WNR59oTl5cIK7XJxUuMzzT9yULyOGybFD86w9MOCGZ1G2wYf. | 2019-06-20 02:55:01 | 2019-06-20 02:55:01 |
|  4 | Letitia Kshlerin    | donnelly.brittany@gmail.com      | $2y$10$iAlmYxOBHmXH7ZQpJPR6uOWR4bIUKuQQ.De5ln9B9T3dyZH3Lz6Yq | 2019-06-20 02:55:01 | 2019-06-20 02:55:01 |
|  5 | June Hauck          | cdonnelly@price.com              | $2y$10$XAs7.XuW2bKtup1/2doFf.0epD7z5ukmPGl6QSEzK/uvEYQh/pHMu | 2019-06-20 02:55:01 | 2019-06-20 02:55:01 |
|  6 | Rachel Gutkowski    | lelia.stark@hotmail.com          | $2y$10$5.Co6sagubR7mPbu.mlpOu7OFPI0nyeNi9zry5DQrNv6RGDHGeWs2 | 2019-06-20 02:55:01 | 2019-06-20 02:55:01 |
|  7 | Angelita Johns      | harris.ken@hotmail.com           | $2y$10$wMN.evqVXKIERt2n0Nu0UOpr0y08EB.k3oc5o6jgRZ8t4/i3KCLRW | 2019-06-20 02:55:01 | 2019-06-20 02:55:01 |
|  8 | Eleonore Effertz    | joesph86@gmail.com               | $2y$10$cscKNYGvNP7AccfRfbVBkO3DRGRJTVW4Lf2.8JU/mTuuir3zwvDV2 | 2019-06-20 02:55:01 | 2019-06-20 02:55:01 |
|  9 | Cade Batz           | ctreutel@hauck.com               | $2y$10$323Er6mzlUN1kBiPi5JrSO8eCb1CGuz2PajUtS/Kyj/McO73zzTT2 | 2019-06-20 02:55:01 | 2019-06-20 02:55:01 |
| 10 | Fanny O'Reilly      | geraldine.vandervort@koelpin.com | $2y$10$dPqWLeSr/3p0B8anuCVg3uTktqA0MtV3HPBN7Ucio0SEUwH5d6x.m | 2019-06-20 02:55:01 | 2019-06-20 02:55:01 |
+----+---------------------+----------------------------------+--------------------------------------------------------------+---------------------+---------------------+
```

for all users the password is: `123456`


this should set up your project



## Warning

* Make sure your port 80 is not used before run docker-compose *
* Close any local http server you have running so it doesn't interrupt the docker compose*


## License

The Lumen framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

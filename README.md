<!-- GETTING STARTED -->
## Getting Started

Task managment system.


### important

* create database in phpMyAdmin
* copy ```.env.example``` file add remame it to ```.env```
* conigration database in ```.env```

### inistallation and run

This is an example of how to list things you need to use the software and how to install them.
* back end server
  ```sh
   composer install
   composer dump-autoload
   composer require laravel/passport
   php artisan migrate
   php artisan passport:install
   php artisan key:generate
   php artisan config:cache
   php artisan db:seed
   php artisan serve
  ```
* front end
  ```sh
  cd ui
  npm install
  npm start
  ```

## Note
 * ```Laravel Framework 8.83.26 ```
 * ```react: "^16.13.1" ```

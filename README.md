<!-- GETTING STARTED -->
## Getting Started

Task managment system.

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

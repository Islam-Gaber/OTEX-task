<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

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

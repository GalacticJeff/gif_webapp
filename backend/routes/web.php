<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

Route::options(
    '/{any:.*}',
    [
        'middleware' => ['cors'], function (){

            return response(['status' => 'success']);
            
        }
    ]
);
/**
 * Auth routes
 * auth/login to request a login token
 */
$router->post('auth/login', ['uses' => 'AuthController@authenticate']);

/**
 * v1/gif routes
 */


$router->group(['middleware' => ['jwt.auth', 'cors'], 'prefix' => 'v1/gif'], function() use ($router) {
    
        $router->get('search/{query}', ['middleware' => 'search.log', 'uses' => 'GifController@getGif']);
        $router->get('history', ['uses' => 'GifController@getHistory']);

        $router->group(['prefix' => 'favorites'], function() use ($router){
            $router->get('get', ['uses' => 'GifController@getFavorites']);
            $router->post('save', ['uses' => 'GifController@saveFavorite']);
        });


    }
);

/**
 * Front end route
 */
$router->get('/{route:.*}/', function ()  {
    return view('index');
});

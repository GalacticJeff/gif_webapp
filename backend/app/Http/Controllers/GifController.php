<?php

namespace App\Http\Controllers;

use Validator;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\User;
use App\favorites;
use App\search_logs;



class GifController extends BaseController
{

    private $request;
    private $client;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        //
        $this->request = $request;
        $this->client = new Client([
            'base_uri' => env('GIPHY_URL'),
            'headers' => [
                'Content-Type' => 'application/x-www-form-urlencoded',
                'api_key' => env('GIPHY_KEY')
            ]
        ]);
    }

    private function saveLog(String $word)
    {

        try {

            $searchLog = search_logs::create([
                'user_id' => $this->request->auth->id,
                'search_log' => $word
            ]);

        } catch (Exception $e) {

            return $e;

        }
        

        return false;

    }

    public function getGif(String $query)
    {
        $this->saveLog($query);

        $response = $this->client->request('GET', 'v1/gifs/search',[
            'query' => [
                'q' => $query
            ]
        ]);
        return response($response->getBody())
                ->withHeaders([
                    'Content-type' => 'Application/json',
                    'Access-Control-Allow-Origin' => 'token'
                ]);
    }

    /**
     * This method saves a gif as favorite in the database
     * 
     * Takes the currend user's id and as a request param the id of the gid as id_gif
     * @return obj 
     */

    public function saveFavorite()
    {
        /**
         * Validates that the id_gif is in the payload and that the id_gif is a string
         */
        $this->validate($this->request, [
            'id_gif'     => 'required|string'
        ]);

        /**
         * Mass assign the favorite gif into the database
         */

        $favorites = favorites::create([
            'user_id' => $this->request->auth->id,
            'id_gif' => $this->request->id_gif
        ]);

        /**
         * return
         */
        return response()->json([
            'success' => 'ok',
            'data' => json_encode($favorites)
        ]);

    }

    public function getFavorites()
    {

        return response()->json([
            'data' => favorites::where('user_id', $this->request->auth->id)->get()
        ]);

    }

    public function getHistory()
    {
        return response()->json([
            'data' => search_logs::where('user_id', $this->request->auth->id)->get()
        ]);
    }

    //
}

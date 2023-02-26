<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\OptionsController;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\UserFormController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('register/', [UserController::class, 'register']);
Route::post('login/', [UserController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function() {
  Route::resource('form', FormController::class);

  Route::resource('question', QuestionController::class);
  Route::get('/form/{id}/questions/', [QuestionController::class, 'index']);

  Route::resource('user-form', UserFormController::class);
  
  Route::resource('options', OptionsController::class);
  Route::resource('answer', AnswerController::class);

  Route::get('users/', [UserController::class, 'show']);
  Route::post('logout/', [UserController::class, 'logout']);
});

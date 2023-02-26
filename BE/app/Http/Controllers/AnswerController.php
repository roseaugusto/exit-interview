<?php

namespace App\Http\Controllers;
use App\Models\Answers;
use App\Models\UserForms;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
       
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $input = $request->input('answers');
      $userform = UserForms::create(['user_id'=>  $request->user()->id, 'form_id'=> $input[0]['formid']]);
      foreach($input as $i) {
          if ($i['answerOptionId'] === NULL) {
            Answers::create([
              'description' => $i['description'],
              'question_id' => $i['questionid'],
              'user_form_id' => $userform->id,
            ]);
          } else {
            if(gettype($i['answerOptionId']) === 'array') {
              foreach($i['answerOptionId'] as $o) {
                Answers::create([
                  'description' => $i['description'],
                  'option_id' => $o,
                  'question_id' => $i['questionid'],
                  'user_form_id' => $userform->id,
                ]);
              }
            } else {
              Answers::create([
                'description' => $i['description'],
                'option_id' => $i['answerOptionId'],
                'question_id' => $i['questionid'],
                'user_form_id' => $userform->id,
              ]);
            }
        }
      }

      return response([
        'message' => 'success'
      ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

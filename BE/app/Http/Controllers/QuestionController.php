<?php

namespace App\Http\Controllers;
use App\Models\Questions;
use App\Models\Forms;
use App\Models\Options;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
      $q = Questions::where('form_id', $id)->get();
      return response($q);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $input = $request->input('form');
      $form = Forms::create(['name'=>$input['name']]);
      if ($form->id){
        foreach($input['questions'] as $i) {
          $q = Questions::create([
            'name' => $i['name'],
            'placeholder' => $i['placeholder'],
            'isRequired' => $i['isRequired'] === 'true' ? true:false,
            'isFilter' => $i['isFilter'] === 'true' ? true:false,
            'type' => $i['type'],
            'form_id' => $form->id,
          ]);

          if($i['type'] === 'radio' || $i['type'] === 'checkbox') {
            foreach($i['options'] as $o) {
              Options::create([
                'name' => $o,
                'question_id' => $q->id,
              ]);
            }
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
      $input = $request->input('form');
      $form = Forms::find($id);

      foreach($input['questions'] as $i) {
        if ($i['id']) {
          $q = Questions::find($i['id']);
          $q->update([
            'name' => $i['name'],
            'placeholder' => $i['placeholder'],
            'isRequired' => $i['isRequired'] === 'true' ? true:false,
            'isFilter' => $i['isFilter'] === 'true' ? true:false,
            'type' => $i['type']
          ]);

          if($i['type'] === 'radio' || $i['type'] === 'checkbox') {
            // delete options
            Options::whereIn('id', $i['delOptions'])->delete();

            //add new ones
            foreach($i['options'] as $o) {
              Options::create([
                'name' => $o,
                'question_id' => $q->id,
              ]);
            }
          }
        }
        else {
          $q = Questions::create([
            'name' => $i['name'],
            'placeholder' => $i['placeholder'],
            'isRequired' => $i['isRequired'] === 'true' ? true:false,
            'isFilter' => $i['isFilter'] === 'true' ? true:false,
            'type' => $i['type'],
            'form_id' => $form->id,
          ]);

          if($i['type'] === 'radio' || $i['type'] === 'checkbox') {
            foreach($i['options'] as $o) {
              Options::create([
                'name' => $o,
                'question_id' => $q->id,
              ]);
            }
          }
        }
      }
      

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

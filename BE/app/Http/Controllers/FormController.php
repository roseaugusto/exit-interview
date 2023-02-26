<?php

namespace App\Http\Controllers;
use App\Models\Forms;
use App\Models\Questions;
use App\Models\Options;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class FormController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $forms = [];
      if(auth()->user()->isAdmin) {
        $forms = Forms::with('responses')->get();
      } else {
        $forms = Forms::with('responses')->get();
      }
      
      return response($forms);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      $form = Forms::with('responses')->find($id);
      return response($form);
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
        $form = Forms::find($id);
        $questions = Questions::where('form_id', $form->id)->get();
        $arr = array();
        foreach($questions as $q) {
          array_push($arr, $q->id);
        }
        Options::whereIn('question_id', $arr)->delete();
        Questions::whereIn('id', $arr)->delete();
        $form->delete();
        return response('sucess', 201);
    }
}

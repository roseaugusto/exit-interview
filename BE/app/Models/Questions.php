<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Questions extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'type', 'placeholder', 'isRequired', 'isFilter', 'status', 'form_id'];

    public function options() {
      return $this->hasMany(Options::class);
    }

    public function answers() {
      return $this->hasMany(Answers::class);
    }
}

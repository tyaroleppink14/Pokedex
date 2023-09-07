<?php

namespace App\Http\Controllers\Ajax;

use App\Http\Controllers\Controller;
use App\Models\NaamModel;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function getData() {
        $data = NaamModel::all();
        return response(['response' => json_encode($data, JSON_UNESCAPED_SLASHES)]);
    }
}

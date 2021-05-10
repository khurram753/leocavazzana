<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\FileService;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function index(FileService $fileService)
    {
        return $fileService->index();
    }

    public function create(FileService $fileService)
    {
        return $fileService->create();
    }

    public function save(Request $request,FileService $fileService)
    {
        $this->validate($request,[
            'document'=>'required|max:2000|mimes:jpeg,jpg,png,docx,docs,txt,pdf'
        ]);
        return $fileService->save($request);
    }

    public function edit($id,FileService $fileService)
    {
        return $fileService->edit($id);
    }

    public function update(Request $request,FileService $fileService)
    {
        $this->validate($request,[
            'document'=>'required|max:2000|mimes:jpeg,jpg,png,docx,docs,txt,pdf'
        ]);
        return $fileService->update($request);
    }

    public function delete(Request $request,FileService $fileService)
    {
        return $fileService->delete($request);
    }

}

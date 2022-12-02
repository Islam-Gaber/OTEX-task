<?php

namespace App\Http\Controllers\api;
use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
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
    use apiResponseTrait;
    public function create(TaskRequest $request)
    {
        DB::beginTransaction();
        //date_default_timezone_set('Africa/Cairo');
        try {
            $data = Task::create([
                    'user_id'             => $request->user()->id,
                    'title'               => $request->title,
                    'description'         => $request->description,
            ]);
            DB::commit();
            if ($data) {
                return $this->apiResponse('Record created', [], new TaskResource($data), [], 201);
            } else {
                return $this->apiResponse('Application error please try again', [], $data, [], 400);
            }
        } catch (\Throwable $th) {
            DB::rollback();
            return $this->apiResponse('Application error please try again', [], $th, [], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function records()
    {
        $items = Task::where('state', '!=', 'delete')->get();
        //return data
        return $this->apiResponse('records', [], TaskResource::collection($items), [], 200);
    }
}
